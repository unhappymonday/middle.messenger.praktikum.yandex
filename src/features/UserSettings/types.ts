import type { TBlockProps } from "@/shared/Components/Block/types";
import type { IFormField, TFormValues } from "@/shared/Components/Form/types";

export type TUserSettingsMode = "profile" | "edit-data" | "edit-password";

export interface IUserSettingsProps extends TBlockProps {
  mode: TUserSettingsMode;
  formId: string;
  fields: IFormField[];
  avatar?: string;
  displayName?: string;
  error?: string;
  onSubmit?: (values: TFormValues) => void;
  onEditData?: () => void;
  onEditPassword?: () => void;
  onAvatarChange?: (file: File) => void;
  onLogout?: () => void | Promise<void>;
}
