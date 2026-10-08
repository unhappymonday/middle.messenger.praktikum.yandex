import Handlebars from "handlebars";

export function registerHelpers(): void {
  Handlebars.registerHelper(
    "dataAttrs",
    function (data?: Record<string, unknown>) {
      if (!data || typeof data !== "object") return "";

      const result = Object.entries(data)
        .filter(
          ([, value]) =>
            value !== undefined && value !== null && value !== false,
        )
        .map(([key, value]) => {
          const name = key.replace(/[A-Z]/g, (ch) => `-${ch.toLowerCase()}`);
          const attr = `data-${Handlebars.escapeExpression(name)}`;
          return value === true
            ? attr
            : `${attr}="${Handlebars.escapeExpression(String(value))}"`;
        })
        .join(" ");

      return new Handlebars.SafeString(result);
    },
  );

  Handlebars.registerHelper(
    "obj",
    function (options: Handlebars.HelperOptions) {
      return options.hash;
    },
  );
}
