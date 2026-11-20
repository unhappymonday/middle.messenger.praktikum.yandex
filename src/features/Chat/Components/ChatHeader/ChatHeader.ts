import type { TBlockProps } from "@/shared/Components/Block/types";

import Block from "@/shared/Components/Block/Block";
import template from "./chat-header.hbs?raw";
import "./chat-header.scss";

export interface IChatHeaderProps extends TBlockProps {
  userName: string;
  avatar?: string;
}

export default class ChatHeader extends Block<IChatHeaderProps> {
  static componentName = "ChatHeader";

  protected template = template;
}
