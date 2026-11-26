import Block from "@/shared/Components/Block/Block";
import template from "./chat.hbs?raw";

import "./chat.scss";
import type { TBlockProps } from "@/shared/Components/Block/types";
import type { IChatMessageGroup } from "@/features/Chat/types";

export interface IChatProps extends TBlockProps {
  isActiveChat?: boolean;
  userName?: string;
  avatar?: string;
  messageGroups?: IChatMessageGroup[];
  onSend?: (message: string) => void;
  onAddUser?: () => void;
  onRemoveUser?: () => void;
  onAvatarChange?: (file: File) => void;
}

export default class Chat extends Block<IChatProps> {
  static componentName = "Chat";
  protected template = template;

  constructor(props: IChatProps) {
    super(props);

    this.events = {
      change: (event) => {
        const target = event.target;

        if (
          !(target instanceof HTMLInputElement) ||
          target.dataset.action !== "upload-avatar"
        ) {
          return;
        }

        const file = target.files?.[0];

        if (file) {
          this.props.onAvatarChange?.(file);
          target.value = "";
        }
      },
    };
  }
}
