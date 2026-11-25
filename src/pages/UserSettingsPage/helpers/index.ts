import type { TUserDTO } from "@/services/api/Users/types";
import type { IFormField } from "@/shared/Components/Form";

export function getProfileFields(
  user: TUserDTO,
  disabled = false,
): IFormField[] {
  return [
    {
      id: "email",
      label: "Почта",
      value: user.email,
      disabled,
    },
    {
      id: "login",
      label: "Логин",
      value: user.login,
      disabled,
    },
    {
      id: "first_name",
      label: "Имя",
      value: user.first_name,
      disabled,
    },
    {
      id: "second_name",
      label: "Фамилия",
      value: user.second_name,
      disabled,
    },
    {
      id: "display_name",
      label: "Имя в чате",
      value: user.display_name ?? "",
      disabled,
    },
    {
      id: "phone",
      label: "Телефон",
      value: user.phone,
      disabled,
    },
  ];
}
