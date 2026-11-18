import Block from "@/shared/Components/Block/Block";
import type { TBlockProps, TEventList } from "@/shared/Components/Block/types";

import template from "./input.hbs?raw";
import "./input.scss";

export type TInputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "search"
  | "tel"
  | "url";

export type TInputVariant = "text" | "search" | "send";

export interface IInputProps extends TBlockProps {
  type?: TInputType;
  variant?: TInputVariant;
  className?: string;
  id?: string;
  name?: string;
  value?: string | number;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  readonly?: boolean;
  autocomplete?: string;
  events?: TEventList;
}

export default class Input extends Block<IInputProps> {
  protected template = template;

  public static componentName = "Input";

  constructor(props: IInputProps) {
    super({
      ...props,
      type: props.type ?? "text",
      variant: props.variant ?? "text",
    });

    this.events = props.events ?? {};
  }

  public setProps(props: Partial<IInputProps>): void {
    if (props.events) {
      this.events = props.events;
    }

    super.setProps(props);
  }

  public getValue(): string {
    return this.getRef<HTMLInputElement>("input").value;
  }

  public setValue(value: string): void {
    this.getRef<HTMLInputElement>("input").value = value;
  }
}
