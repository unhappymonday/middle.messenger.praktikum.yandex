import type { TBlockProps } from "@/shared/Components/Block/types";
import type { IUserSettingsProps } from "@/features/UserSettings/types";

import Block from "@/shared/Components/Block/Block";
import template from "./user-settings-page.hbs?raw";

export type IUserSettingsPageProps = TBlockProps & IUserSettingsProps;

export default class UserSettingsPage extends Block<IUserSettingsPageProps> {
  protected template = template;
}
