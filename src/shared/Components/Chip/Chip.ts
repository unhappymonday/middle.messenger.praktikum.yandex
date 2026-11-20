import Block from "@/shared/Components/Block/Block";
import type { TBlockProps } from "@/shared/Components/Block/types";

import template from "./chip.hbs?raw";
import "./chip.scss";

export interface IChipProps extends TBlockProps {
  count: number;
}

export default class Chip extends Block<IChipProps> {
  protected template = template;

  public static componentName = "Chip";

  constructor(props: IChipProps) {
    super(props);
  }
}
