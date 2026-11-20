import Block from "@/shared/Components/Block/Block";
import template from "./chat.hbs?raw";

import "./chat.scss";
import type { TBlockProps } from "@/shared/Components/Block/types";
import type { IChatMessageGroup } from "@/features/Chat/types";

export interface IChatProps extends TBlockProps {
  isActiveChat?: boolean;
  userName?: string;
  avatar?: string;
  messageGroups?: IChatMessageGroup[];
  onSend?: (message: string) => void;
}

export default class Chat extends Block<IChatProps> {
  static componentName = "Chat";
  protected template = template;
}
