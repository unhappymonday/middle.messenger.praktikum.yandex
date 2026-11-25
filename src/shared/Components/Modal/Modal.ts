import Block from "@/shared/Components/Block/Block";
import type { IModalProps } from "@/shared/Components/Modal/types";
import template from "./modal.hbs?raw";

import "./modal.scss";

export default class Modal extends Block<IModalProps> {
  public static componentName = "Modal";

  protected template = template;

  constructor(props: IModalProps) {
    super(props);

    this.props = {
      ...this.props,
      closeEvents: { click: () => this.close() },
    };

    this.events = {
      click: this.handleClick,
      submit: this.handleSubmit,
      close: this.handleClose,
    };
  }

  public open(): void {
    const dialog = this.element();

    if (dialog instanceof HTMLDialogElement && !dialog.open) {
      dialog.showModal();
    }
  }

  public close(): void {
    const dialog = this.element();

    if (dialog instanceof HTMLDialogElement && dialog.open) {
      dialog.close();
    }
  }

  public setAlert(message: string): void {
    const alert = this.getRef("alert");

    alert.textContent = message;
    alert.hidden = message === "";
  }

  private handleClick = (event: MouseEvent): void => {
    const { target } = event;

    const isBackdrop = target === event.currentTarget;
    const isCloseButton =
      target instanceof Element &&
      target.closest("[data-modal-close]") !== null;

    if (isBackdrop || isCloseButton) {
      this.close();
    }
  };

  private handleSubmit = (event: SubmitEvent): void => {
    event.preventDefault();

    if (event.target instanceof HTMLFormElement) {
      void this.props.onSubmit?.(new FormData(event.target));
    }
  };

  private handleClose = (): void => {
    this.props.onClose?.();
  };
}
