import type { TBlockProps } from "@/shared/Components/Block/types";
import type { IChatMessageGroup } from "@/features/Chat/types";
import Block from "@/shared/Components/Block/Block";
import template from "./chat-body.hbs?raw";
import "./chat-body.scss";

export interface IChatBodyProps extends TBlockProps {
  messageGroups: IChatMessageGroup[];
}
export default class ChatBody extends Block<IChatBodyProps> {
  static componentName = "ChatBody";

  protected template = template;
}
