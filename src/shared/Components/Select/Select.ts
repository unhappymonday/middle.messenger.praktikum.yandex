import Block from "@/shared/Components/Block/Block";
import template from "./select.hbs?raw";

import "./select.scss";
import type { ISelectProps } from "@/shared/Components/Select/types";

export default class Select extends Block<ISelectProps> {
  static componentName = "Select";

  protected template = template;
}
