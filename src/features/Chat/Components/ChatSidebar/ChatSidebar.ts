import Block from "@/shared/Components/Block/Block";
import template from "./chat-sidebar.hbs?raw";
import type { IChatSidebarProps } from "./types";

import "./chat-sidebar.scss";

export default class ChatSidebar extends Block<IChatSidebarProps> {
  static componentName = "ChatSidebar";
  protected template = template;

  constructor(props: IChatSidebarProps) {
    super(props);

    this.events = {
      click: (event) => {
        const target = event.target as HTMLElement;
        const item = target.closest<HTMLElement>("[data-id]");

        if (item?.dataset.id) {
          this.props.onChatClick?.(item.dataset.id);
        }
      },
    };
  }
}
