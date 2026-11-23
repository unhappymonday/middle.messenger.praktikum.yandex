import AuthPage from "@/pages/AuthPage";
import ChatPage from "@/pages/ChatPage";
import ErrorPage from "@/pages/ErrorPage";
import { loginConfig, signinConfig } from "@/pages/AuthPage/config";
import { UserSettingsPage } from "@/pages";
import { SETTINGS_FIELDS } from "@/pages/UserSettingsPage/settingsConfig";
import Router from "@/services/router/Router";
import { ROUTES } from "@/services/config/api";
import AuthController from "@/services/controllers/AuthController";
import type { TSignInRequest, TSignUpRequest } from "@/services/api/Auth/types";
import type { IBlockComponent } from "@/shared/Components/Block/types";
import ChatsController from "@/services/controllers/ChatsController";
import { connect } from "@/services/store/helpers/connect";
import { mapChatsToProps } from "@/pages/ChatPage/helpers";

const ConnectedChatPage = connect(mapChatsToProps)(ChatPage);

export default class App {
  private readonly router: Router;

  constructor(rootQuery: string = "#app") {
    this.router = new Router(rootQuery);
  }

  public start(): void {
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
      if (error) {
        console.error(error);
      }
    };

    return new ConnectedChatPage({
      chats: [],
      onSend: (message) => console.log(message),
      onCreateChat: async (title) =>
        report(await ChatsController.createChat(title)),
      onDeleteChat: async (id) => report(await ChatsController.deleteChat(id)),
      onAddUser: async (login) =>
        report(await ChatsController.addUserByLogin(login)),
      onRemoveUser: async (id) => report(await ChatsController.removeUser(id)),
    });
  }

  private createSettingsPage(): UserSettingsPage {
    const page = new UserSettingsPage({
      mode: "profile",
      formId: "profile",
      displayName: "Иван",
      fields: SETTINGS_FIELDS.profile,

      onEditData: () =>
        page.setProps({
          mode: "edit-data",
          formId: "edit-data",
          fields: SETTINGS_FIELDS["edit-data"],
        }),

      onEditPassword: () =>
        page.setProps({
          mode: "edit-password",
          formId: "edit-password",
          fields: SETTINGS_FIELDS["edit-password"],
        }),

      onSubmit: (values) => {
        console.log("settings", values);
      },
    });

    return page;
  }
}
