import type { TFormCard } from "@/layout/types";

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
