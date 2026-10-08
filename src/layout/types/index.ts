import type { TFormField } from "@/components/types";

export type TFormCard = {
  title: string;
  formId: string;
  fields: TFormField[];
  submitText: string;
  link: { text: string; page: "auth" | "registration" };
};
