import type { TBlockProps } from "@/shared/Components/Block/types";
import Block from "@/shared/Components/Block/Block";
import template from "./chat-page.hbs?raw";
import type { IChatMessageGroup, TChatCard } from "@/features/Chat/types";

import "./chat-page.scss";
import { CreateChatModal } from "@/features/Chat/Components";

export interface IChatPageProps extends TBlockProps {
  chats: TChatCard[];
  isActiveChat?: boolean;
  userName?: string;
  avatar?: string;
  messageGroups?: IChatMessageGroup[];
  onChatClick?: (chatId: string) => void;
  onSend?: (message: string) => void;
  onCreateChat?: (title: string) => Promise<string | null>;
  onCreateChatClick?: () => void;
}

export default class ChatPage extends Block<IChatPageProps> {
  protected template = template;

  private createChatModal: CreateChatModal | null = null;

  constructor(props: IChatPageProps) {
    super(props);

    this.props = {
      ...this.props,
      onChatClick: this.handleChatClick,
      onCreateChatClick: this.handleCreateChatClick,
    };
  }

  public override destroy(): void {
    this.closeCreateChatModal();
    super.destroy();
  }

  private handleChatClick = (chatId: string): void => {
    const selectedChat = this.props.chats.find((chat) => chat.id === chatId);

    if (!selectedChat) {
      console.error("[ChatPage] Чат не найден:", chatId);
      return;
    }

    const updatedChats = this.props.chats.map((chat) => ({
      ...chat,
      isActive: chat.id === chatId,
    }));

    const messageGroups: IChatMessageGroup[] = [
      {
        label: "",
        messages: selectedChat.chat.messages,
      },
    ];

    this.setProps({
      chats: updatedChats,
      isActiveChat: true,
      userName: selectedChat.chat.userName,
      avatar: selectedChat.chat.avatar,
      messageGroups,
    });

    console.log("[ChatPage] Активный чат:", {
      isActiveChat: this.props.isActiveChat,
      userName: this.props.userName,
      messages: this.props.messageGroups,
    });
  };

  private handleCreateChatClick = (): void => {
    if (this.createChatModal) {
      return;
    }

    this.createChatModal = new CreateChatModal({
      onSubmit: async (title) =>
        (await this.props.onCreateChat?.(title)) ?? null,
      onClose: () => this.closeCreateChatModal(),
    });

    this.createChatModal.open();
  };

  private closeCreateChatModal(): void {
    this.createChatModal?.destroy();
    this.createChatModal = null;
  }
}
