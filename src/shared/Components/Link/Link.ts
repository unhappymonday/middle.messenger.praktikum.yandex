import Block from "@/shared/Components/Block/Block";
import type { TBlockProps, TEventList } from "@/shared/Components/Block/types";

import template from "./link.hbs?raw";
import "./link.scss";

export type TLinkVariant = "text" | "warning" | "profile";

export interface ILinkProps extends TBlockProps {
  href?: string;
  variant?: TLinkVariant;
  className?: string;
  id?: string;
  page?: string;
  action?: string;
  text: string;
  icon?: string;
  ariaLabel?: string;
  events?: TEventList;
}

export default class Link extends Block<ILinkProps> {
  protected template = template;

  public static componentName = "Link";

  constructor(props: ILinkProps) {
    super({
      ...props,
      variant: props.variant ?? "text",
    });

    this.events = props.events ?? {};
  }

  public setProps(props: Partial<ILinkProps>): void {
    if (props.events) {
      this.events = props.events;
    }

    super.setProps(props);
  }
}
