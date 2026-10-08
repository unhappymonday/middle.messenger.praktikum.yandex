import Handlebars from "handlebars";

const files = import.meta.glob(
  ["../components/**/*.hbs", "../layout/**/*.hbs"],
  { query: "?raw", import: "default", eager: true },
) as Record<string, string>;

export function registerPartial(): void {
  Object.entries(files).forEach(([path, source]) => {
    const name = path
      .split("/")
      .pop()!
      .replace(/\.hbs$/, "");

    if (name in Handlebars.partials) {
      console.warn(`Partial "${name}" is already registered. Skipping.`);
    }

    Handlebars.registerPartial(name, source);
  });
}
