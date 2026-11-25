import type { TBlockProps } from "@/shared/Components/Block/types";

import Block from "@/shared/Components/Block/Block";
import template from "./chat-header.hbs?raw";
import "./chat-header.scss";

export interface IChatHeaderProps extends TBlockProps {
  userName: string;
  avatar?: string;
  onAddUser?: () => void;
  onRemoveUser?: () => void;
}

export default class ChatHeader extends Block<IChatHeaderProps> {
  static componentName = "ChatHeader";

  protected template = template;

  constructor(props: IChatHeaderProps) {
    super(props);

    this.props = {
      ...this.props,
      showMenu: false,
      onMenuClick: this.handleMenuClick,
      onAddUserClick: this.handleAddUserClick,
      onRemoveUserClick: this.handleRemoveUserClick,
    };
  }

  protected override componentDidMount(): void {
    document.addEventListener("pointerdown", this.handleOutsideClick);
    document.addEventListener("keydown", this.handleKeyDown);
  }

  protected override componentWillUnmount(): void {
    document.removeEventListener("pointerdown", this.handleOutsideClick);
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  private handleMenuClick = (): void => {
    this.setProps({
      showMenu: !this.props.showMenu,
    });
  };

  private handleAddUserClick = (): void => {
    this.setProps({ showMenu: false });
    this.props.onAddUser?.();
  };

  private handleRemoveUserClick = (): void => {
    console.log("[ChatHeader] Remove clicked");
    this.setProps({ showMenu: false });
    this.props.onRemoveUser?.();
  };

  private handleOutsideClick = (event: MouseEvent): void => {
    const target = event.target;

    if (
      this.props.showMenu &&
      target instanceof Node &&
      !this.element().contains(target)
    ) {
      this.setProps({ showMenu: false });
    }
  };

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Escape" && this.props.showMenu) {
      this.setProps({ showMenu: false });
    }
  };
}
