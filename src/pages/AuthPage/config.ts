import type { IFormCardConfig } from "@/features/FormCard/types";
import { ROUTES } from "@/services/config/api";

export const loginConfig: IFormCardConfig = {
  title: "Вход",
  formId: "login",
  submitText: "Авторизоваться",
  link: {
    page: ROUTES.SIGN_UP,
    text: "Нет аккаунта?",
  },
  fields: [
    { id: "login", label: "Логин", type: "text" },
    { id: "password", label: "Пароль", type: "password" },
  ],
};

export const signinConfig: IFormCardConfig = {
  title: "Регистрация",
  formId: "signin",
  submitText: "Зарегистрироваться",
  link: {
    page: ROUTES.LOGIN,
    text: "Уже есть аккаунт? Войти",
  },
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
