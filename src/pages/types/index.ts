export type TPageName =
  | "auth"
  | "chat"
  | "registration"
  | "settings"
  | "notFound"
  | "serverError";

export type TSettingsMode = "profile" | "edit-data" | "edit-password";

export type TNavigate = (pageName: TPageName) => void;
