import Handlebars from "handlebars";
import type { HelperOptions } from "handlebars";
import type { IComponentClass } from "@/shared/types";
import type { TBlockProps } from "@/shared/Components/Block/types";

export function registerComponent(Component: IComponentClass): void {
  Handlebars.registerHelper(
    Component.componentName,
    function (this: unknown, options: HelperOptions) {
      const component = new Component(options.hash as TBlockProps);

      const data = options.data;
      const root = data.root as TBlockProps;

      if ("ref" in options.hash && typeof options.hash.ref === "string") {
        root.__refs = root.__refs ?? {};
        root.__refs[options.hash.ref] = component.element();
      }

      root.__children = root.__children ?? [];

      root.__children.push({
        component,
        embed(node: DocumentFragment) {
          const placeholder = node.querySelector(
            `[data-component="${Component.componentName}"]`,
          );

          if (!placeholder) {
            throw new Error(
              `Не найден placeholder для ${Component.componentName}`,
            );
          }

          placeholder.replaceWith(component.element());
        },
      });

      return new Handlebars.SafeString(
        `<div data-component="${Component.componentName}"></div>`,
      );
    },
  );
}
