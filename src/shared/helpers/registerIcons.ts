import Handlebars from "handlebars";

const icons = import.meta.glob<string>("/src/shared/Icons/**/*.hbs", {
  query: "?raw",
  import: "default",
  eager: true,
});

export function registerIcons(): void {
  console.log("найдено иконок:", Object.keys(icons));

  Object.entries(icons).forEach(([path, template]) => {
    const name = path
      .split("/")
      .pop()!
      .replace(/\.hbs$/, "");

    Handlebars.registerPartial(name, template);
  });
}
