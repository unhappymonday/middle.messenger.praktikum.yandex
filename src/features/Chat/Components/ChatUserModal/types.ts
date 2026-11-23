import type { TBlockProps } from "@/shared/Components/Block/types";
import type { ISelectOption } from "@/shared/Components/Select/types";

export type TChatUserModalMode = "add" | "remove";

export interface IChatUserModalProps extends TBlockProps {
  mode: TChatUserModalMode;
  users?: ISelectOption[];
  onSubmit: (value: string) => Promise<string | null>;
  onClose?: () => void;
}
