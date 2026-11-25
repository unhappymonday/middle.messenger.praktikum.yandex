import type { TBlockProps } from "@/shared/Components/Block/types";
import Block from "@/shared/Components/Block/Block";
import template from "./chat-page.hbs?raw";
import type { IChatMessageGroup, TChatCard } from "@/features/Chat/types";
import store from "@/services/store/Store";
import "./chat-page.scss";
import { ChatUserModal, CreateChatModal } from "@/features/Chat/Components";
import ChatsController from "@/services/controllers/ChatsController";
import type { ISelectOption } from "@/shared/Components/Select/types";
import type { TChatUserDTO } from "@/services/api/Chats/types";

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
  onAddUserClick?: () => void;
  onRemoveUserClick?: () => void;
}

export default class ChatPage extends Block<IChatPageProps> {
  protected template = template;

  private createChatModal: CreateChatModal | null = null;
  private addUserModal: ChatUserModal | null = null;
  private removeUserModal: ChatUserModal | null = null;

  constructor(props: IChatPageProps) {
    super(props);

    this.props = {
      ...this.props,
      onChatClick: this.handleChatClick,
      onCreateChatClick: this.handleCreateChatClick,
      onAddUserClick: this.handleAddUserClick,
      onRemoveUserClick: this.handleRemoveUserClick,
    };
  }

  public override destroy(): void {
    this.closeCreateChatModal();
    this.closeAddUserModal();
    this.closeRemoveUserModal();

    super.destroy();
  }

  private handleChatClick = async (chatId: string): Promise<void> => {
    const selectedChat = this.props.chats.find((chat) => chat.id === chatId);

    if (!selectedChat) {
      console.error("[ChatPage] Чат не найден:", chatId);
      return;
    }

    const error = await ChatsController.selectChat(Number(chatId));

    if (error) {
      console.error("[ChatPage] Не удалось загрузить участников:", error);
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

  private handleAddUserClick = (): void => {
    if (this.addUserModal) {
      return;
    }

    this.addUserModal = new ChatUserModal({
      mode: "add",
      onSubmit: (login) => ChatsController.addUserByLogin(login),
      onClose: () => this.closeAddUserModal(),
    });

    this.addUserModal.open();
  };

  private handleRemoveUserClick = (): void => {
    if (this.removeUserModal) {
      return;
    }

    const users = this.getActiveUsersOptions();

    if (users.length === 0) {
      console.warn("[ChatPage] Нет участников для удаления");
      return;
    }

    this.removeUserModal = new ChatUserModal({
      mode: "remove",
      users,
      onSubmit: (value) => ChatsController.removeUser(Number(value)),
      onClose: () => this.closeRemoveUserModal(),
    });

    this.removeUserModal.open();
  };

  private getActiveUsersOptions(): ISelectOption[] {
    const users = store.getState().activeChatUsers as TChatUserDTO[];

    return users.map((user) => ({
      value: String(user.id),
      label: user.display_name || user.login,
    }));
  }

  private closeCreateChatModal(): void {
    this.createChatModal?.destroy();
    this.createChatModal = null;
  }

  private closeAddUserModal(): void {
    this.addUserModal?.destroy();
    this.addUserModal = null;
  }

  private closeRemoveUserModal(): void {
    this.removeUserModal?.destroy();
    this.removeUserModal = null;
  }
}
