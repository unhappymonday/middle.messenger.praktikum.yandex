import Handlebars from "handlebars";
import type { TNavigate } from "./types";

export abstract class Page {
  protected abstract template: string;

  constructor(protected navigate: TNavigate) {}

  protected getContext(): Record<string, unknown> {
    return {};
  }

  render(): string {
    const compiled = Handlebars.compile(this.template);
    return compiled(this.getContext());
  }

  afterRender(_root: HTMLElement): void {}
}
