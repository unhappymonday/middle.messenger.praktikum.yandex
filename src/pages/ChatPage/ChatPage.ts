import type { TBlockProps } from "@/shared/Components/Block/types";
import Block from "@/shared/Components/Block/Block";
import template from "./chat-page.hbs?raw";
import type { IChatMessageGroup, TChatCard } from "@/features/Chat/types";

import "./chat-page.scss";

export interface IChatPageProps extends TBlockProps {
  chats: TChatCard[];
  isActiveChat?: boolean;
  userName?: string;
  avatar?: string;
  messageGroups?: IChatMessageGroup[];
  onChatClick?: (chatId: string) => void;
  onSend?: (message: string) => void;
}

export default class ChatPage extends Block<IChatPageProps> {
  protected template = template;

  constructor(props: IChatPageProps) {
    super(props);

    this.props = {
      ...this.props,
      onChatClick: this.handleChatClick,
    };
  }

  private handleChatClick = (chatId: string): void => {
    console.log("[ChatPage] Получен ID:", chatId);

    const updatedChats = this.props.chats.map((chat) => ({
      ...chat,
      isActive: chat.id === chatId,
    }));

    console.log("[ChatPage] Обновлённые чаты:", updatedChats);

    this.setProps({
      chats: updatedChats,
    });
  };
}
