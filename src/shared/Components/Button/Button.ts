import Block from "@/shared/Components/Block/Block";
import type { TBlockProps, TEventList } from "@/shared/Components/Block/types";

import template from "./button.hbs?raw";
import "./button.scss";

export type TButtonVariant = "filled" | "icon" | "contained";

export interface IButtonProps extends TBlockProps {
  type?: "button" | "submit" | "reset";
  variant?: TButtonVariant;
  className?: string;
  id?: string;
  disabled?: boolean;
  ariaLabel?: string;
  formId?: string;
  data?: Record<string, unknown>;
  icon?: string;
  text?: string;
  events?: TEventList;
}

export default class Button extends Block<IButtonProps> {
  protected template = template;

  public static componentName = "Button";

  constructor(props: IButtonProps) {
    super({
      ...props,
      type: props.type ?? "button",
      variant: props.variant ?? "filled",
    });

    this.events = props.events ?? {};
  }

  public setProps(props: Partial<IButtonProps>): void {
    if (props.events) {
      this.events = props.events;
    }

    super.setProps(props);
  }
}
