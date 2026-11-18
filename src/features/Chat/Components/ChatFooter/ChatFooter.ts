import type { TBlockProps } from "@/shared/Components/Block/types";
import Block from "@/shared/Components/Block/Block";
import template from "./chat-footer.hbs?raw";
import "./chat-footer.scss";

export interface IChatFooterProps extends TBlockProps {
  onSend?: (message: string) => void;
}

export default class ChatFooter extends Block<IChatFooterProps> {
  static componentName = "ChatFooter";

  protected template = template;

  constructor(props: IChatFooterProps) {
    super(props);

    this.events = {
      click: (event) => {
        if (this.getRef("sendButton").contains(event.target as Node)) {
          this.send();
        }
      },
      keydown: (event) => {
        if (event.key === "Enter" && event.target === this.getRef("message")) {
          this.send();
        }
      },
    };
  }

  private send(): void {
    const input = this.getRef<HTMLInputElement>("message");
    const message = input.value.trim();

    if (!message) {
      return;
    }

    this.props.onSend?.(message);
    input.value = "";
  }
}
