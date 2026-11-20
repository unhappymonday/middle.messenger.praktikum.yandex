import Block from "@/shared/Components/Block/Block";
import template from "./user-settings.hbs?raw";
import type { IUserSettingsProps } from "./types";

import "./user-settings.scss";

export default class UserSettings extends Block<IUserSettingsProps> {
  static componentName = "UserSettings";

  protected template = template;

  constructor(props: IUserSettingsProps) {
    super(props);

    this.events = {
      click: (event) => {
        const link = (event.target as HTMLElement).closest<HTMLElement>(
          "[data-action]",
        );

        switch (link?.dataset.action) {
          case "edit-data":
            event.preventDefault();
            this.props.onEditData?.();
            break;
          case "edit-password":
            event.preventDefault();
            this.props.onEditPassword?.();
            break;
          default:
        }
      },
    };
  }
}
