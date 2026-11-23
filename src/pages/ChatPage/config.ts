import type { IFormField } from "@/shared/Components/Form";

export const CREATE_CHAT_FIELDS: IFormField[] = [
  {
    id: "title",
    label: "Название чата",
    type: "text",
    placeholder: "Введите название чата",
    ref: "titleInput",
  },
];
