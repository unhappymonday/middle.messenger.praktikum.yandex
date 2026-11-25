import type { IFormField } from "@/shared/Components/Form/types";

export const PASSWORD_FIELDS: IFormField[] = [
  {
    id: "oldPassword",
    label: "Старый пароль",
    type: "password",
  },
  {
    id: "newPassword",
    label: "Новый пароль",
    type: "password",
  },
];
