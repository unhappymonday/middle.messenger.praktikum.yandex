import Block from "@/shared/Components/Block/Block";
import template from "./form-card.hbs?raw";
import type { IFormCardProps } from "./types";

import "./form-card.scss";

export default class FormCard extends Block<IFormCardProps> {
  static componentName = "FormCard";
  protected template = template;

  protected componentDidMount(): void {
    console.log("FormCard link:", this.props.link);
  }
}
