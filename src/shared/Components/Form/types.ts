import type { TBlockProps } from "@/shared/Components/Block/types";

export interface IFormField {
  id: string;
  label: string;
  type?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
}

export type TFormValues = Record<string, string>;

export interface IFormProps extends TBlockProps {
  formId: string;
  fields: IFormField[];
  onSubmit?: (values: TFormValues) => void;
}
