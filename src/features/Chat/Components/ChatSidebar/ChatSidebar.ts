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
        const item = (event.target as HTMLElement).closest<HTMLElement>(
          "[data-action='chat']",
        );

        console.log("Найден элемент:", item);
        console.log("ID чата:", item?.dataset.id);

        if (item?.dataset.id) {
          this.props.onChatClick?.(item.dataset.id);
        }
      },
    };
  }
}
