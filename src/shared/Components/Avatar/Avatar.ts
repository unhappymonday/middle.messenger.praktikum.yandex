import Block from "@/shared/Components/Block/Block";
import type { TBlockProps } from "@/shared/Components/Block/types";

import template from "./avatar.hbs?raw";
import "./avatar.scss";

export type TAvatarType = "small" | "big";

export interface IAvatarProps extends TBlockProps {
  type?: TAvatarType;
  avatar?: string;
  onAvatarChange?: (file: File) => void;
  isAvatarHasChanged?: boolean;
}

export default class Avatar extends Block<IAvatarProps> {
  protected template = template;

  public static componentName = "Avatar";

  constructor(props: IAvatarProps) {
    super({
      ...props,
      type: props.type ?? "small",
      isAvatarHasChanged: props.isAvatarHasChanged ?? false,
    });

    this.events = {
      click: (event) => {
        const target = event.target;

        if (!(target instanceof Element)) {
          return;
        }

        if (target.closest(".avatar__input")) {
          return;
        }

        this.getRef<HTMLInputElement>("fileInput").click();
      },

      change: (event) => {
        const target = event.target;

        if (target instanceof HTMLInputElement && target.files?.[0]) {
          this.props.onAvatarChange?.(target.files[0]);
          target.value = "";
        }
      },
    };
  }
}
