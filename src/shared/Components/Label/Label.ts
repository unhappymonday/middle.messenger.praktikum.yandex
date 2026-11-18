import type { TBlockProps, TEventList } from "@/shared/Components/Block/types";
import template from "./label.hbs?raw";
import Block from "@/shared/Components/Block/Block";
import "./label.scss";

export interface ILabelProps extends TBlockProps {
  text?: string;
  for?: string;
  id?: string;
  className?: string;
  children?: unknown;
  events?: TEventList;
}

export default class Label extends Block<ILabelProps> {
  static componentName = "Label";

  protected template = template;

  constructor(props: ILabelProps) {
    super(props);

    this.events = props.events ?? {};
  }

  public setProps(props: Partial<ILabelProps>): void {
    if (props.events) {
      this.events = props.events;
    }

    super.setProps(props);
  }
}
