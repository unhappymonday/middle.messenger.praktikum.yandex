import type { TBlockProps } from "@/shared/Components/Block/types";

export interface IFormField {
  id: string;
  label: string;
  type?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

export type TValidationErrors = Record<string, string>;

export type TValidationField =
  | "first_name"
  | "second_name"
  | "login"
  | "email"
  | "password"
  | "phone"
  | "message";

export type TFormValues = Record<string, string>;

export interface IFormProps extends TBlockProps {
  formId: string;
  fields: IFormField[];
  onSubmit?: (values: TFormValues) => void;
}
