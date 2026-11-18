import Block from "@/shared/Components/Block/Block";
import type { IInputProps } from "@/shared/Components/Input/types";
import template from "./input.hbs?raw";
import "./input.scss";

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
