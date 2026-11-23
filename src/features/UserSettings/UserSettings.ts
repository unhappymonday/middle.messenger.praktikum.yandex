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
        const target = event.target;

        if (!(target instanceof Element)) {
          return;
        }

        const link = target.closest<HTMLElement>("[data-action]");

        switch (link?.dataset.action) {
          case "edit-data":
            event.preventDefault();
            this.props.onEditData?.();
            break;

          case "edit-password":
            event.preventDefault();
            this.props.onEditPassword?.();
            break;

          case "logout":
            event.preventDefault();
            console.log("LOGOUT CLICK");
            void this.props.onLogout?.();
            break;

          default:
            break;
        }
      },

      change: (event) => {
        const target = event.target;

        if (
          !(target instanceof HTMLInputElement) ||
          target.dataset.action !== "upload-avatar"
        ) {
          return;
        }

        const file = target.files?.[0];

        if (file) {
          this.props.onAvatarChange?.(file);
          target.value = "";
        }
      },
    };
  }
}
