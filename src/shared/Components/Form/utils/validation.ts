import type { TFormValues } from "@/shared/Components/Form";
import {
  FIELD_ALIASES,
  VALIDATION_MESSAGES,
  VALIDATION_RULES,
} from "@/shared/Components/Form/constants";
import type {
  TValidationErrors,
  TValidationField,
} from "@/shared/Components/Form/types";

export const validateField = (name: string, value: string): string | null => {
  const field = FIELD_ALIASES[name] ?? name;

  if (!(field in VALIDATION_RULES)) {
    return null;
  }

  const key = field as TValidationField;
  const normalizedValue = key === "password" ? value : value.trim();

  return VALIDATION_RULES[key].test(normalizedValue)
    ? null
    : VALIDATION_MESSAGES[key];
};

export const validateForm = (values: TFormValues): TValidationErrors => {
  const errors: TValidationErrors = {};

  Object.entries(values).forEach(([name, value]) => {
    const error = validateField(name, value);

    if (error) {
      errors[name] = error;
    }
  });

  return errors;
};

export const getFormValues = (form: HTMLFormElement): TFormValues => {
  const values: TFormValues = {};

  Array.from(form.elements).forEach((element) => {
    if (
      !(
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLSelectElement
      )
    ) {
      return;
    }

    if (!element.name || element.disabled) {
      return;
    }

    if (element instanceof HTMLInputElement) {
      if (element.type === "radio") {
        if (element.checked) {
          values[element.name] = element.value;
        }
        return;
      }

      if (element.type === "checkbox") {
        values[element.name] = String(element.checked);
        return;
      }

      if (element.type === "file") {
        values[element.name] = element.files?.[0]?.name ?? "";
        return;
      }
    }

    values[element.name] = element.value;
  });

  return values;
};
