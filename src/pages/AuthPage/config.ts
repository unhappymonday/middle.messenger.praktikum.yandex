import type { IFormCardConfig } from "@/features/FormCard/types";

export const loginConfig: IFormCardConfig = {
  title: "Вход",
  formId: "login",
  submitText: "Авторизоваться",
  link: { page: "registration", text: "Нет аккаунта?" },
  fields: [
    { id: "login", label: "Логин", type: "text" },
    { id: "password", label: "Пароль", type: "password" },
  ],
};

export const signinConfig: IFormCardConfig = {
  title: "Регистрация",
  formId: "signin",
  submitText: "Зарегистрироваться",
  link: { page: "auth", text: "Войти" },
  fields: [
    { id: "email", label: "Почта", type: "email" },
    { id: "login", label: "Логин", type: "text" },
    { id: "first_name", label: "Имя", type: "text" },
    { id: "second_name", label: "Фамилия", type: "text" },
    { id: "phone", label: "Телефон", type: "tel" },
    { id: "password", label: "Пароль", type: "password" },
    { id: "password_repeat", label: "Пароль (ещё раз)", type: "password" },
  ],
};
