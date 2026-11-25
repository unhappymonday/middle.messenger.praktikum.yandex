import type { TValidationField } from "@/shared/Components/Form/types";

export const VALIDATION_RULES: Record<TValidationField, RegExp> = {
  first_name: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
  second_name: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
  login: /^(?=.*[A-Za-z])[A-Za-z0-9_-]{3,20}$/,
  email: /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]{2,}$/,
  password: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
  phone: /^\+?\d{10,15}$/,
  message: /\S/,
  title: /\S/,
};

export const VALIDATION_MESSAGES: Record<TValidationField, string> = {
  first_name: "Введите имя с заглавной буквы. Допустимы буквы и дефис",
  second_name: "Введите фамилию с заглавной буквы. Допустимы буквы и дефис",
  login: "От 3 до 20 символов: латиница, цифры, дефис и подчёркивание",
  email: "Введите корректный адрес электронной почты",
  password: "От 8 до 40 символов, минимум одна заглавная буква и цифра",
  phone: "Введите от 10 до 15 цифр. Плюс допускается в начале",
  message: "Сообщение не должно быть пустым",
  title: "Название чата не должно быть пустым",
};

export const FIELD_ALIASES: Record<string, TValidationField> = {
  oldPassword: "password",
  newPassword: "password",
  repeatPassword: "password",
  password_repeat: "password",
};
