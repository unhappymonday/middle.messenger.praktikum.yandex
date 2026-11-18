import Block from "@/shared/Components/Block/Block";
import type { TBlockProps } from "@/shared/Components/Block/types";

import template from "./avatar.hbs?raw";
import "./avatar.scss";

export type TAvatarType = "small" | "big";

export interface IAvatarProps extends TBlockProps {
  type?: TAvatarType;
  avatar?: string;
}

export default class Avatar extends Block<IAvatarProps> {
  protected template = template;

  public static componentName = "Avatar";

  constructor(props: IAvatarProps) {
    super({
      ...props,
      type: props.type ?? "small",
    });
  }
}
