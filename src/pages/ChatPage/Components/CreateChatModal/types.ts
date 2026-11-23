import type { TBlockProps } from "@/shared/Components/Block/types";

export interface ICreateChatModalProps extends TBlockProps {
  onSubmit: (title: string) => Promise<string | null>;
  onClose?: () => void;
}
