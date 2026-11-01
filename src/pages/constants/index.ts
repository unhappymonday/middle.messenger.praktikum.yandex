import type { TFormField } from "@/components/types";
import type { TFormCard } from "@/layout/types";
import type { TSettingsMode } from "@/pages/types";

export const AUTH_CARD: TFormCard = {
  title: "Вход",
  formId: "auth-form",
  submitText: "Авторизоваться",
  link: { text: "Нет аккаунта?", page: "registration" },
  fields: [
    {
      id: "login",
      label: "Логин",
      value: "",
      type: "text",
      placeholder: "Введите логин",
    },
    {
      id: "password",
      label: "Пароль",
      type: "password",
      value: "",
      placeholder: "Введите пароль",
    },
  ],
};

export const REGISTRATION_CARD: TFormCard = {
  title: "Регистрация",
  formId: "registration-form",
  submitText: "Зарегистрироваться",
  link: { text: "Войти", page: "auth" },
  fields: [
    { id: "email", label: "Почта", value: "", type: "email" },
    { id: "login", label: "Логин", value: "", type: "text" },
    { id: "first_name", label: "Имя", value: "", type: "text" },
    { id: "second_name", label: "Фамилия", value: "", type: "text" },
    { id: "phone", label: "Телефон", value: "", type: "tel" },
    { id: "password", label: "Пароль", value: "", type: "password" },
    {
      id: "password_repeat",
      label: "Пароль (ещё раз)",
      value: "",
      type: "password",
    },
  ],
};

export const SETTINGS_FIELDS: Record<TSettingsMode, TFormField[]> = {
  profile: [
    { id: "email", label: "Почта", value: "pochta@yandex.ru", type: "email" },
    { id: "login", label: "Логин", value: "ivanivanov" },
    { id: "first_name", label: "Имя", value: "Иван" },
    { id: "second_name", label: "Фамилия", value: "Иванов" },
    { id: "display_name", label: "Имя в чате", value: "Иван" },
    { id: "phone", label: "Телефон", value: "+7 (909) 967 30 30", type: "tel" },
  ],
  "edit-data": [],
  "edit-password": [
    { id: "oldPassword", label: "Старый пароль", value: "", type: "password" },
    { id: "newPassword", label: "Новый пароль", value: "", type: "password" },
    {
      id: "repeatPassword",
      label: "Повторите новый пароль",
      value: "",
      type: "password",
    },
  ],
};
SETTINGS_FIELDS["edit-data"] = SETTINGS_FIELDS.profile;
