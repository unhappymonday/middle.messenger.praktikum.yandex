import type { TBlockProps } from "@/shared/Components/Block/types";

export interface IModalProps extends TBlockProps {
  title: string;
  actionText: string;
  formId?: string;
  alert?: string;
  children?: unknown;
  onSubmit?: (data: FormData) => void | Promise<void>;
  onClose?: () => void;
}
