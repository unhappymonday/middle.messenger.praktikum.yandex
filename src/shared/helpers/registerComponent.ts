import { HelperOptions } from 'handlebars';
export function registerComponent(Component) {
  Handlebars.registerHelper(
    Component.componentName
  )
}