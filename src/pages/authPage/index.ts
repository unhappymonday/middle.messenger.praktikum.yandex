import { Page } from "@/pages/Page";
import authPage from "./authPage.hbs?raw";
import { AUTH_CARD } from "@/pages/constants";

export class AuthPage extends Page {
  protected template = authPage;

  protected getContext() {
    return AUTH_CARD;
  }
}
