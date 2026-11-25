import type { TBlockProps } from "@/shared/Components/Block/types";

export interface ISelectOption {
  value: string;
  label: string;
}

export interface ISelectProps extends TBlockProps {
  name: string;
  options: ISelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}
