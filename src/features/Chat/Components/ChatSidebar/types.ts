import type { TChatCard } from "@/features/Chat/types";
import type { TBlockProps } from "@/shared/Components/Block/types";

export interface IChatSidebarProps extends TBlockProps {
  chats: TChatCard[];
  onChatClick?: (chatId: string) => void;
}
