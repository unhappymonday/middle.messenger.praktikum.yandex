import AuthPage from "@/pages/AuthPage";
import ChatPage from "@/pages/ChatPage";
import ErrorPage from "@/pages/ErrorPage";
import { loginConfig, signinConfig } from "@/pages/AuthPage/config";
import { UserSettingsPage } from "@/pages";
import { PASSWORD_FIELDS } from "@/pages/UserSettingsPage/settingsConfig";
import userController from "@/services/controllers/UserController";
import store from "@/services/store/Store";
import Router from "@/services/router/Router";
import { ROUTES } from "@/services/config/api";
import AuthController from "@/services/controllers/AuthController";
import type { TSignInRequest, TSignUpRequest } from "@/services/api/Auth/types";
import type { IBlockComponent } from "@/shared/Components/Block/types";
import ChatsController from "@/services/controllers/ChatsController";
import { connect } from "@/services/store/helpers/connect";
import { mapChatsToProps } from "@/pages/ChatPage/helpers";
import { getProfileFields } from "@/pages/UserSettingsPage/helpers";
import type { TUserDTO } from "@/services/api/Users/types";
import type { TFormValues } from "@/shared/Components/Form";
import { getAvatarUrl } from "@/utils/getAvatarUrl";
import MessagesController from "@/services/controllers/MessagesController";

const ConnectedChatPage = connect(mapChatsToProps)(ChatPage);

export default class App {
  private readonly router: Router;

  constructor(rootQuery: string = "#app") {
    this.router = new Router(rootQuery);
  }

  public async start(): Promise<void> {
    this.router
      .use(ROUTES.LOGIN, () => this.createLoginPage(), "guest")
      .use(ROUTES.SIGN_UP, () => this.createSignUpPage(), "guest")
      .use(ROUTES.MESSENGER, () => this.createChatPage(), "private")
      .use(ROUTES.SETTINGS, () => this.createSettingsPage(), "private")
      .use(
        ROUTES.NOT_FOUND,
        () => new ErrorPage({ code: "404", text: "Не туда попали" }),
      )
      .use(
        ROUTES.SERVER_ERROR,
        () => new ErrorPage({ code: "500", text: "Мы уже фиксим" }),
      );

    await AuthController.fetchUser();

    this.router.start();
  }

  private createLoginPage(): AuthPage {
    return new AuthPage({
      ...loginConfig,
      onSubmit: async (values) => {
        const error = await AuthController.signIn(values as TSignInRequest);

        if (error) {
          console.error(error);
        }
      },
    });
  }

  private createSignUpPage(): AuthPage {
    return new AuthPage({
      ...signinConfig,
      onSubmit: async (values) => {
        const data: TSignUpRequest = {
          first_name: values.first_name,
          second_name: values.second_name,
          login: values.login,
          email: values.email,
          password: values.password,
          phone: values.phone,
        };

        const error = await AuthController.signUp(data);

        if (error) {
          console.error(error);
        }
      },
    });
  }

  private createChatPage(): IBlockComponent {
    const report = (error: string | null): void => {
      if (error) console.error(error);
    };

    void ChatsController.init().then(report);

    return new ConnectedChatPage({
      chats: [],
      onSend: (message: string) =>
        report(MessagesController.sendMessage(message)),
      onCreateChat: (title) => ChatsController.createChat(title),
      onDeleteChat: async (id: number) =>
        report(await ChatsController.deleteChat(id)),
      onAddUser: (login: string) => ChatsController.addUserByLogin(login),
      onRemoveUser: (id: number) => ChatsController.removeUser(id),
      onAvatarChange: async (file: File) =>
        report(await ChatsController.updateAvatar(file)),
    });
  }

  private createSettingsPage(): UserSettingsPage {
    const user = store.getState().user as TUserDTO;

    if (!user) {
      throw new Error("User is not authorized");
    }

    let mode: "profile" | "edit-data" | "edit-password" = "profile";

    const page = new UserSettingsPage({
      mode,
      formId: "profile",
      displayName: user.display_name ?? user.first_name,
      avatar: getAvatarUrl(user.avatar),
      fields: getProfileFields(user, true),

      onEditData: () => {
        const currentUser = store.getState().user as TUserDTO;

        mode = "edit-data";

        page.setProps({
          mode,
          formId: "edit-data",
          fields: getProfileFields(currentUser),
          error: undefined,
        });
      },

      onEditPassword: () => {
        mode = "edit-password";

        page.setProps({
          mode,
          formId: "edit-password",
          fields: PASSWORD_FIELDS,
          error: undefined,
        });
      },

      onSubmit: async (values: TFormValues) => {
        let error: string | null = null;

        if (mode === "edit-data") {
          error = await userController.updateProfile({
            first_name: values.first_name,
            second_name: values.second_name,
            display_name: values.display_name,
            login: values.login,
            email: values.email,
            phone: values.phone,
          });
        }

        if (mode === "edit-password") {
          error = await userController.updatePassword({
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
          });
        }

        if (error) {
          page.setProps({ error });
          return;
        }

        const updatedUser = store.getState().user as TUserDTO;

        mode = "profile";

        page.setProps({
          mode,
          formId: "profile",
          displayName: updatedUser.display_name ?? updatedUser.first_name,
          avatar: getAvatarUrl(updatedUser.avatar),
          fields: getProfileFields(updatedUser, true),
          error: undefined,
        });
      },

      onAvatarChange: async (file: File) => {
        const error = await userController.updateAvatar(file);

        if (error) {
          page.setProps({ error });
          return;
        }

        const updatedUser = store.getState().user as TUserDTO;

        page.setProps({
          avatar: getAvatarUrl(updatedUser.avatar),
          error: undefined,
        });
      },

      onLogout: async () => {
        const error = await AuthController.logout();
        if (error) {
          page.setProps({ error });
        }
      },
    });

    return page;
  }
}
