import Block from "@/shared/Components/Block/Block";
import Modal from "@/shared/Components/Modal/Modal";

import template from "./chat-user-modal.hbs?raw";
import type { IChatUserModalProps } from "@/features/Chat/Components/ChatUserModal/types";

export default class ChatUserModal extends Block<IChatUserModalProps> {
  protected template = template;

  private host: HTMLElement | null = null;
  private isPending = false;

  private readonly formId: string;

  constructor(props: IChatUserModalProps) {
    super(props);

    this.formId =
      props.mode === "add" ? "add-chat-user-form" : "remove-chat-user-form";

    this.props = {
      ...this.props,
      formId: this.formId,
      title:
        props.mode === "add" ? "Добавить пользователя" : "Удалить пользователя",
      actionText: props.mode === "add" ? "Добавить" : "Удалить",
      onModalSubmit: this.handleSubmit,
      onModalClose: this.handleClose,
    };
  }

  public open(): void {
    this.host = this.element();
    document.body.append(this.host);

    this.getModal().open();

    this.host
      .querySelector<HTMLInputElement | HTMLSelectElement>("input, select")
      ?.focus();
  }

  public override destroy(): void {
    super.destroy();
    this.host?.remove();
    this.host = null;
  }

  private getModal(): Modal {
    const modal = this.children.find(
      (child): child is Modal => child instanceof Modal,
    );

    if (!modal) {
      throw new Error("Modal is not rendered");
    }

    return modal;
  }

  private handleSubmit = async (data: FormData): Promise<void> => {
    if (this.isPending) {
      return;
    }

    const modal = this.getModal();

    const fieldName = this.props.mode === "add" ? "login" : "userId";
    const value = String(data.get(fieldName) ?? "").trim();

    if (!value) {
      modal.setAlert(
        this.props.mode === "add"
          ? "Введите логин пользователя"
          : "Выберите пользователя",
      );
      return;
    }

    modal.setAlert("");
    this.isPending = true;

    try {
      const error = await this.props.onSubmit(value);

      if (error) {
        modal.setAlert(error);
        return;
      }

      modal.close();
    } finally {
      this.isPending = false;
    }
  };

  private handleClose = (): void => {
    this.props.onClose?.();
  };
}
