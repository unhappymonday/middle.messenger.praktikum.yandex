import Handlebars from "handlebars";
import type { HelperOptions } from "handlebars";
import type { IComponentClass } from "@/shared/types";
import type { TBlockProps } from "@/shared/Components/Block/types";
import { getPlaceholderIds } from "@/shared/utils/getPlaceholderIds";
import { takeChildren } from "@/shared/utils/takeChildren";

let placeholderCounter = 0;

export function registerComponent<P extends TBlockProps>(
  Component: IComponentClass<P>,
): void {
  Handlebars.registerHelper(
    Component.componentName,
    function (this: unknown, options: HelperOptions) {
      const root = options.data.root as TBlockProps;

      root.__children = root.__children ?? [];
      root.__refs = root.__refs ?? {};

      const isBlock = typeof options.fn === "function";

      const content: unknown = isBlock
        ? options.fn(this)
        : options.hash.children;

      const nestedChildren = takeChildren(root, getPlaceholderIds(content));

      const componentProps = {
        ...options.hash,
        ...(isBlock
          ? { children: new Handlebars.SafeString(String(content)) }
          : {}),
        __children: nestedChildren,
      } as unknown as P;

      const component = new Component(componentProps);

      if (typeof options.hash.ref === "string" && options.hash.ref.length > 0) {
        root.__refs[options.hash.ref] = component.element();
      }

      const placeholderId = `component-${++placeholderCounter}`;

      root.__children.push({
        component,
        placeholderId,
        embed(node: DocumentFragment) {
          const placeholder = node.querySelector(
            `[data-component-placeholder="${placeholderId}"]`,
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
        `<div data-component-placeholder="${placeholderId}"></div>`,
      );
    },
  );
}
