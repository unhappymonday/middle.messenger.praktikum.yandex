import type { TBlockProps } from "@/shared/Components/Block/types";
import type { IFormField, TFormValues } from "@/shared/Components/Form/types";

export interface IFormCardLink {
  page: string;
  text: string;
}

export interface IFormCardConfig {
  title: string;
  formId: string;
  fields: IFormField[];
  submitText: string;
  link: IFormCardLink;
}

export interface IFormCardProps extends TBlockProps, IFormCardConfig {
  onSubmit?: (values: TFormValues) => void;
}

export type TFormField = {
  id: string;
  label: string;
  value: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
};

export type TForm = TFormField[];

export type TFormCard = {
  title: string;
  formId: string;
  fields: TFormField[];
  submitText: string;
  link: { text: string; page: "auth" | "registration" };
};
