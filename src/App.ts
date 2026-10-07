import type { Page } from "@/pages/Page";
import type { TPageName } from "@/pages/types";
import {
  AuthPage,
  ChatPage,
  RegistrationPage,
  SettingsPage,
} from "./pages/index";

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
    };
  }

  render(): void {
    const page = this.pages[this.currentPage];
    this.root.innerHTML = page.render();
    this.attachNavigation();
    page.afterRender(this.root);
  }

  changePage(page: TPageName): void {
    this.currentPage = page;
    this.render();
  }

  private attachNavigation(): void {
    const links = this.root.querySelectorAll<HTMLElement>("[data-page]");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        this.changePage(link.dataset.page as TPageName);
      });
    });
  }
}
