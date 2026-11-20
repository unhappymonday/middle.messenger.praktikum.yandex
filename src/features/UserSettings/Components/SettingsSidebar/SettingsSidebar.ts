import type { TBlockProps } from "@/shared/Components/Block/types";
import Block from "@/shared/Components/Block/Block";
import template from "./settings-sidebar.hbs?raw";

import "./settings-sidebar.scss";

export type ISettingsSidebarProps = TBlockProps;

export default class SettingsSidebar extends Block<ISettingsSidebarProps> {
  static componentName = "UserSettingsSidebar";
  protected template = template;
}
