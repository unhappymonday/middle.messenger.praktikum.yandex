import type { TBlockProps } from "@/shared/Components/Block/types";
import type { IFormCardProps } from "@/features/FormCard/types";
import Block from "@/shared/Components/Block/Block";
import template from "./auth-page.hbs?raw";

export type IAuthPageProps = TBlockProps & IFormCardProps;

export default class AuthPage extends Block<IAuthPageProps> {
  protected template = template;
}
