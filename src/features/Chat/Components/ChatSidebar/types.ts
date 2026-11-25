import type { TChatCard } from "@/features/Chat/types";
import type { TBlockProps, TEventList } from "@/shared/Components/Block/types";

export interface IChatSidebarProps extends TBlockProps {
  chats: TChatCard[];
  onChatClick?: (chatId: string) => void;
  onCreateChat?: () => void;
  createChatEvents?: TEventList;
}
