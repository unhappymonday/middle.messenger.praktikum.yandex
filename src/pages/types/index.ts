export type TPageName = "auth" | "chat" | "registration" | "settings";

export type TNavigate = (pageName: TPageName) => void;
