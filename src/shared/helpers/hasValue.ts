import Handlebars from "handlebars";

Handlebars.registerHelper(
  "hasValue",
  (value: unknown) => value !== undefined && value !== null && value !== "",
);
