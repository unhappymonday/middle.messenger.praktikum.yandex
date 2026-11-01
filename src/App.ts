import type { Page } from "@/pages/Page";
import type { TPageName } from "@/pages/types";
import {
  AuthPage,
  ChatPage,
  RegistrationPage,
  SettingsPage,
} from "./pages/index";
import { ErrorPage } from "@/pages/errorPage";

export default class App {
  private currentPage: TPageName = "auth";
  private pages: Record<TPageName, Page>;

  constructor(private root: HTMLElement) {
    const navigate = (page: TPageName) => this.changePage(page);

    this.pages = {
      auth: new AuthPage(navigate),
      registration: new RegistrationPage(navigate),
      chat: new ChatPage(navigate),
      settings: new SettingsPage(navigate),
      notFound: new ErrorPage(navigate, "404", "Не туда попали"),
      serverError: new ErrorPage(navigate, "500", "Мы уже фиксим"),
    };

    this.root.addEventListener("click", this.handleNavigation);
  }

  render(): void {
    const page = this.pages[this.currentPage];
    try {
      this.root.innerHTML = page.render();
      page.afterRender(this.root);
    } catch (e) {
      console.error(e);
      if (this.currentPage !== "serverError") {
        this.currentPage = "serverError";
        this.render();
      }
    }
  }

  changePage(page: TPageName): void {
    this.pages[this.currentPage].destroy();
    this.currentPage = page in this.pages ? page : "notFound";
    this.render();
  }

  private handleNavigation = (e: Event) => {
    const link = (e.target as HTMLElement).closest<HTMLElement>("[data-page]");
    if (!link?.dataset.page) return;

    e.preventDefault();
    this.changePage(link.dataset.page as TPageName);
  };
}
