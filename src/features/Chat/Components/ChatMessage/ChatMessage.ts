import Block from "@/shared/Components/Block/Block";
import template from "./chat-message.hbs?raw";
import type { TBlockProps } from "@/shared/Components/Block/types";

import type { TMessageSender } from "@/features/Chat/types";
import "./chatMessage.scss";

export type TChatMessageSender = "own" | "other";

export interface IChatMessageProps extends TBlockProps {
  content: string;
  sender: TMessageSender;
  sent_at: string;
  isOwn?: boolean;
}

export default class ChatMessage extends Block<IChatMessageProps> {
  static componentName = "ChatMessage";

  protected template = template;

  constructor(props: IChatMessageProps) {
    super({ ...props, isOwn: props.sender === "own" });
  }
}
