import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";
import { ROUTES } from "@/services/config/api";
import Router from "@/services/router/Router";
import type { IBlockComponent } from "@/shared/Components/Block/types";

const storeMock = vi.hoisted(() => ({
  state: { user: null as unknown },
}));

vi.mock("@/services/store/Store", () => ({
  default: { getState: () => storeMock.state },
}));

const PAGE_A = "/page-a";
const PAGE_B = "/page-b";
const BROKEN = "/broken";

type TTestBlock = IBlockComponent & { destroy: Mock<() => void> };

function createBlock(name: string): TTestBlock {
  const element = document.createElement("div");
  element.textContent = name;

  return { element: () => element, destroy: vi.fn<() => void>() };
}

describe("Router", () => {
  let router: Router;
  let blocks: Record<string, TTestBlock[]>;

  const getRoot = (): HTMLElement =>
    document.querySelector("#app") as HTMLElement;

  const factory = (name: string) => (): TTestBlock => {
    const block = createBlock(name);

    blocks[name] = [...(blocks[name] ?? []), block];

    return block;
  };

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    window.history.replaceState({}, "", "/");
    storeMock.state.user = null;
    blocks = {};

    router = new Router("#app")
      .use(ROUTES.LOGIN, factory("login"), "guest")
      .use(ROUTES.MESSENGER, factory("messenger"), "private")
      .use(ROUTES.NOT_FOUND, factory("not-found"))
      .use(ROUTES.SERVER_ERROR, factory("server-error"))
      .use(PAGE_A, factory("page-a"))
      .use(PAGE_B, factory("page-b"))
      .use(BROKEN, () => {
        throw new Error("render failed");
      });
  });

  afterEach(() => {
    router.stop();
  });

  it("renders the page that matches the current URL", () => {
    window.history.replaceState({}, "", PAGE_A);

    router.start();

    expect(getRoot().textContent).toBe("page-a");
  });

  it("opens the not found page for an unknown URL", () => {
    window.history.replaceState({}, "", "/unknown");

    router.start();

    expect(window.location.pathname).toBe(ROUTES.NOT_FOUND);
    expect(getRoot().textContent).toBe("not-found");
  });

  it("redirects a guest from a private route to login", () => {
    window.history.replaceState({}, "", ROUTES.MESSENGER);

    router.start();

    expect(window.location.pathname).toBe(ROUTES.LOGIN);
    expect(getRoot().textContent).toBe("login");
  });

  it("redirects an authorized user from a guest route to messenger", () => {
    storeMock.state.user = { id: 1 };
    window.history.replaceState({}, "", ROUTES.LOGIN);

    router.start();

    expect(window.location.pathname).toBe(ROUTES.MESSENGER);
    expect(getRoot().textContent).toBe("messenger");
  });

  it("go pushes a history entry, renders the page and destroys the previous one", () => {
    window.history.replaceState({}, "", PAGE_A);
    router.start();

    const length = window.history.length;
    const [previous] = blocks["page-a"];

    router.go(PAGE_B);

    expect(window.location.pathname).toBe(PAGE_B);
    expect(window.history.length).toBe(length + 1);
    expect(getRoot().textContent).toBe("page-b");
    expect(previous.destroy).toHaveBeenCalledTimes(1);
  });

  it("navigates on click on an element with data-link", () => {
    window.history.replaceState({}, "", PAGE_A);
    router.start();

    const link = document.createElement("a");
    const child = document.createElement("span");

    link.dataset.link = PAGE_B;
    link.append(child);
    document.body.append(link);

    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    child.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(window.location.pathname).toBe(PAGE_B);
    expect(getRoot().textContent).toBe("page-b");
  });

  it("renders the page for the new location on popstate (back button)", () => {
    window.history.replaceState({}, "", PAGE_A);
    router.start();

    window.history.replaceState({}, "", PAGE_B);
    window.dispatchEvent(new PopStateEvent("popstate"));

    expect(getRoot().textContent).toBe("page-b");
  });

  it("redirects to the server error page when a page fails to render", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    window.history.replaceState({}, "", PAGE_A);
    router.start();

    router.go(BROKEN);

    expect(window.location.pathname).toBe(ROUTES.SERVER_ERROR);
    expect(getRoot().textContent).toBe("server-error");
  });
});
