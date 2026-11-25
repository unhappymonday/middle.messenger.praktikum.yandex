import { ROUTES } from "@/services/config/api";
import Route from "@/services/router/Route";
import store from "@/services/store/Store";
import type { TBlockFactory, TRouteAccess } from "@/services/router/types";

export default class Router {
  private static instance: Router | undefined;

  private readonly routes: Route[] = [];

  private currentRoute: Route | null = null;

  private rootQuery = "#app";

  constructor(rootQuery: string = "#app") {
    if (Router.instance) {
      return Router.instance;
    }

    this.rootQuery = rootQuery;
    Router.instance = this;
  }

  public use(
    pathname: string,
    factory: TBlockFactory,
    access: TRouteAccess = "public",
  ): this {
    this.routes.push(new Route(pathname, factory, this.rootQuery, access));

    return this;
  }

  public start(): void {
    window.addEventListener("popstate", this.handlePopState);
    document.addEventListener("click", this.handleLinkClick);

    this.onRoute(window.location.pathname);
  }

  public go(pathname: string): void {
    const target = this.resolve(pathname);

    if (target !== window.location.pathname) {
      window.history.pushState({}, "", target);
    }

    this.render(target);
  }

  public replace(pathname: string): void {
    const target = this.resolve(pathname);

    window.history.replaceState({}, "", target);
    this.render(target);
  }

  public back(): void {
    window.history.back();
  }

  public forward(): void {
    window.history.forward();
  }

  private getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }

  private resolve(pathname: string): string {
    const route = this.getRoute(pathname);

    if (!route) {
      return ROUTES.NOT_FOUND;
    }

    const isAuthorized = Boolean(store.getState().user);

    if (route.access === "private" && !isAuthorized) {
      return ROUTES.LOGIN;
    }

    if (route.access === "guest" && isAuthorized) {
      return ROUTES.MESSENGER;
    }

    return pathname;
  }

  private onRoute(pathname: string): void {
    const target = this.resolve(pathname);

    if (target !== window.location.pathname) {
      window.history.replaceState({}, "", target);
    }

    this.render(target);
  }

  private render(pathname: string): void {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    this.currentRoute?.leave();
    this.currentRoute = route;

    try {
      route.render();
    } catch (error) {
      console.error("Page render error:", error);
      route.leave();

      if (pathname !== ROUTES.SERVER_ERROR) {
        this.replace(ROUTES.SERVER_ERROR);
      }
    }
  }

  private handlePopState = (): void => {
    this.onRoute(window.location.pathname);
  };

  private handleLinkClick = (event: MouseEvent): void => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const path = event.target.closest<HTMLElement>("[data-link]")?.dataset.link;

    if (!path) {
      return;
    }

    event.preventDefault();
    this.go(path);
  };
}
