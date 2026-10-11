import { Page } from "@/pages/Page";
import errorPage from "./errorPage.hbs?raw";
import type { TNavigate } from "@/pages/types";

export class ErrorPage extends Page {
  protected template = errorPage;

  constructor(
    navigate: TNavigate,
    private code: string,
    private text: string,
  ) {
    super(navigate);
  }

  protected getContext() {
    return { code: this.code, text: this.text };
  }
}
