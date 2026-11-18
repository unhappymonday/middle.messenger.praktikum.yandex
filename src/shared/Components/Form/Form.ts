import Block from "@/shared/Components/Block/Block";
import template from "./form.hbs?raw";
import type { IFormProps, TFormValues } from "./types";

import "./form.scss";

export default class Form extends Block<IFormProps> {
  static componentName = "Form";

  protected template = template;

  constructor(props: IFormProps) {
    super(props);

    this.events = {
      submit: (event) => {
        event.preventDefault();
        this.props.onSubmit?.(this.getValues());
      },
    };
  }

  public getValues(): TFormValues {
    const form = this.element() as HTMLFormElement;

    return Object.fromEntries(
      [...new FormData(form).entries()].map(([key, value]) => [
        key,
        String(value),
      ]),
    );
  }
}
