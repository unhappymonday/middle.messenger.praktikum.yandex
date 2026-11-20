import type { TBlockProps, TEventList } from "@/shared/Components/Block/types";

export type TInputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "search"
  | "tel"
  | "url";

export type TInputVariant = "text" | "search" | "send";

export interface IInputProps extends TBlockProps {
  type?: TInputType;
  variant?: TInputVariant;
  className?: string;
  id?: string;
  name?: string;
  value?: string | number;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  readonly?: boolean;
  autocomplete?: string;
  invalid?: boolean;
  events?: TEventList;
}
