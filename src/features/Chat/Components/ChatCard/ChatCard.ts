import Block from "@/shared/Components/Block/Block";
import template from "./chat-card.hbs?raw";

import type { TBlockProps } from "@/shared/Components/Block/types";
import "./chat-card.scss";

export interface IChatCardProps extends TBlockProps {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  isOwnMessage?: boolean;
  unreadCount?: number;
  isActive?: boolean;
}

export default class ChatCard extends Block<IChatCardProps> {
  static componentName = "ChatCard";

  protected template = template;

  constructor(props: IChatCardProps) {
    super(props);
  }
}
