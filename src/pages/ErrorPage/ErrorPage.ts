import type { TBlockProps } from "@/shared/Components/Block/types";
import type { TNavigate } from "@/pages/types";

import Block from "@/shared/Components/Block/Block";
import template from "./error-page.hbs?raw";

import "./error-page.scss";

export interface IErrorPageProps extends TBlockProps {
  code: string;
  text: string;
  navigate?: TNavigate;
}

export default class ErrorPage extends Block<IErrorPageProps> {
  protected template = template;
}
