import Block from "@/shared/Components/Block/Block";
import template from "./form.hbs?raw";
import type { IFormField, IFormProps, TFormValues } from "./types";

import "./form.scss";
import {
  validateField,
  validateForm,
} from "@/shared/Components/Form/utils/validation";

export default class Form extends Block<IFormProps> {
  static componentName = "Form";

  protected template = template;

  private values: TFormValues = {};

  constructor(props: IFormProps) {
    super(props);

    this.values = this.getInitialValues(props.fields);

    this.events = {
      input: (event) => {
        const target = event.target;

        if (!(target instanceof HTMLElement)) {
          return;
        }

        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement
        ) {
          if (target.name) {
            this.values[target.name] = target.value;
          }
        }
      },

      focusout: (event) => {
        const target = event.target;

        if (
          !(
            target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement ||
            target instanceof HTMLSelectElement
          )
        ) {
          return;
        }

        if (!target.name) {
          return;
        }

        this.values[target.name] = target.value;

        const error = validateField(target.name, target.value);

        this.updateFields({
          [target.name]: error ?? "",
        });
      },

      submit: (event) => {
        event.preventDefault();

        const values = this.getValues();
        this.values = { ...values };

        const errors = validateForm(values);

        this.updateFields(errors);

        if (Object.keys(errors).length > 0) {
          return;
        }

        this.props.onSubmit?.(values);
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

  protected componentDidUpdate(): void {
    this.values = this.getInitialValues(this.props.fields);
  }

  private getInitialValues(fields: IFormField[]): TFormValues {
    return Object.fromEntries(
      fields.map((field) => [field.id, field.value ?? ""]),
    );
  }

  private updateFields(errors: Record<string, string>): void {
    const fields = this.props.fields.map((field) => ({
      ...field,
      value: this.values[field.id] ?? field.value ?? "",
      error: errors[field.id] || undefined,
    }));

    this.setProps({ fields });
  }
}
