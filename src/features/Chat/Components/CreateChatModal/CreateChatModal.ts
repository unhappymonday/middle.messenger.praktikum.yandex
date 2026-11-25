import { Modal } from "@/shared/Components";
import Block from "@/shared/Components/Block/Block";

import template from "./create-chat-modal.hbs?raw";
import type { ICreateChatModalProps } from "@/features/Chat/Components/CreateChatModal/types";

export default class CreateChatModal extends Block<ICreateChatModalProps> {
  protected template = template;

  private host: HTMLElement | null = null;

  private isPending = false;

  constructor(props: ICreateChatModalProps) {
    super(props);

    this.props = {
      ...this.props,
      onModalSubmit: this.handleSubmit,
      onModalClose: this.handleClose,
    };
  }

  public open(): void {
    this.host = this.element();
    document.body.append(this.host);

    this.getModal().open();
    this.host.querySelector<HTMLInputElement>("input")?.focus();
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
    const title = String(data.get("title") ?? "").trim();

    if (!title) {
      modal.setAlert("Введите название чата");
      return;
    }

    modal.setAlert("");
    this.isPending = true;

    try {
      const error = await this.props.onSubmit(title);

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
