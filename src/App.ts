import type { IBlockComponent } from "@/shared/Components/Block/types";
import type { TPageName } from "@/pages/types";
import AuthPage from "@/pages/AuthPage";
import ChatPage from "@/pages/ChatPage";
import ErrorPage from "@/pages/ErrorPage";
import { loginConfig, signinConfig } from "@/pages/AuthPage/config";
import { UserSettingsPage } from "@/pages";
import { CHAT_LIST } from "@/mocks";
import { SETTINGS_FIELDS } from "@/pages/UserSettingsPage/settingsConfig";

export default class App {
  private currentPage: TPageName = "auth";
  private page: IBlockComponent | null = null;
  private readonly factories: Record<TPageName, () => IBlockComponent>;

  constructor(private readonly root: HTMLElement) {
    this.factories = {
      auth: () =>
        new AuthPage({
          ...loginConfig,
          onSubmit: (v) => {
            console.log("login", v);
            this.changePage("chat");
          },
        }),
      registration: () =>
        new AuthPage({
          ...signinConfig,
          onSubmit: (v) => {
            console.log("signin", v);
            this.changePage("chat");
          },
        }),
      chat: () => this.createChatPage(),
      settings: () => this.createSettingsPage(),
      notFound: () => new ErrorPage({ code: "404", text: "Не туда попали" }),
      serverError: () => new ErrorPage({ code: "500", text: "Мы уже фиксим" }),
    };

    this.root.addEventListener("click", this.handleNavigation);
  }

  render(): void {
    this.page?.destroy();
    this.page = null;

    try {
      this.page = this.factories[this.currentPage]();
      this.root.replaceChildren(this.page.element());
    } catch (error) {
      console.error("Ошибка при отображении страницы:", error);

      if (this.currentPage !== "serverError") {
        this.currentPage = "serverError";
        this.render();
      }
    }
  }

  changePage(page: TPageName): void {
    this.currentPage = page in this.factories ? page : "notFound";
    this.render();
  }

  destroy(): void {
    this.root.removeEventListener("click", this.handleNavigation);
    this.page?.destroy();
  }

  private createChatPage(): ChatPage {
    const page: ChatPage = new ChatPage({
      chats: CHAT_LIST,
      isActiveChat: false,
      onChatClick: () => page.setProps({ isActiveChat: true }),
      onSend: (message) => console.log(message),
    });

    return page;
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

  private handleNavigation = (event: Event): void => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const link = target.closest<HTMLElement>("[data-page]");
    const page = link?.dataset.page;

    if (!page) {
      return;
    }

    event.preventDefault();
    this.changePage(page as TPageName);
  };
}
