import UserSettings from "./UserSettings";
import SettingsSidebar from "./Components/SettingsSidebar";
import { registerComponent } from "@/shared/helpers/registerComponent";
import type { IComponentClass } from "@/shared/types";

export default function registerUserSettingsComponents(): void {
  ([UserSettings, SettingsSidebar] as IComponentClass[]).forEach(
    registerComponent,
  );
}
