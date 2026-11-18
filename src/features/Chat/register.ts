import Chat from "@/features/Chat/Chat";
import {
  ChatBody,
  ChatCard,
  ChatFooter,
  ChatHeader,
  ChatMessage,
  ChatSidebar,
} from "@/features/Chat/Components";
import { registerComponent } from "@/shared/helpers/registerComponent";
import type { IComponentClass } from "@/shared/types";

export default function registerChatComponents(): void {
  (
    [
      ChatHeader,
      ChatBody,
      ChatFooter,
      ChatCard,
      ChatSidebar,
      ChatMessage,
      Chat,
    ] as IComponentClass[]
  ).forEach(registerComponent);
}
