import type { TUserSettingsMode } from "@/features/UserSettings/types";
import type { IFormField } from "@/shared/Components/Form/types";

export const SETTINGS_FIELDS: Record<TUserSettingsMode, IFormField[]> = {
  profile: [
    {
      id: "email",
      label: "Почта",
      value: "pochta@yandex.ru",
      type: "email",
    },
    {
      id: "login",
      label: "Логин",
      value: "ivanivanov",
      type: "text",
    },
    {
      id: "first_name",
      label: "Имя",
      value: "Иван",
      type: "text",
    },
    {
      id: "second_name",
      label: "Фамилия",
      value: "Иванов",
      type: "text",
    },
    {
      id: "display_name",
      label: "Имя в чате",
      value: "Иван",
      type: "text",
    },
    {
      id: "phone",
      label: "Телефон",
      value: "+7 (909) 967 30 30",
      type: "tel",
    },
  ],

  "edit-data": [
    {
      id: "email",
      label: "Почта",
      value: "pochta@yandex.ru",
      type: "email",
    },
    {
      id: "login",
      label: "Логин",
      value: "ivanivanov",
      type: "text",
    },
    {
      id: "first_name",
      label: "Имя",
      value: "Иван",
      type: "text",
    },
    {
      id: "second_name",
      label: "Фамилия",
      value: "Иванов",
      type: "text",
    },
    {
      id: "display_name",
      label: "Имя в чате",
      value: "Иван",
      type: "text",
    },
    {
      id: "phone",
      label: "Телефон",
      value: "+7 (909) 967 30 30",
      type: "tel",
    },
  ],

  "edit-password": [
    {
      id: "oldPassword",
      label: "Старый пароль",
      value: "",
      type: "password",
    },
    {
      id: "newPassword",
      label: "Новый пароль",
      value: "",
      type: "password",
    },
    {
      id: "repeatPassword",
      label: "Повторите новый пароль",
      value: "",
      type: "password",
    },
  ],
};
