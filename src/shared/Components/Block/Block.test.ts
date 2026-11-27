import { describe, expect, it, vi } from "vitest";
import { TestBlock } from "./testUtils";

describe("Block", () => {
  it("renders the template with props and returns the same element", () => {
    const block = new TestBlock({ title: "Hello" });

    expect(block.element().textContent).toBe("Hello");
    expect(block.element()).toBe(block.element());
  });

  it("escapes HTML in props (XSS)", () => {
    const payload = '<img src="x" onerror="alert(1)">';
    const element = new TestBlock({ title: payload }).element();

    expect(element.querySelector("img")).toBeNull();
    expect(element.textContent).toBe(payload);
  });

  it("throws when the template has no single root element", () => {
    const block = new TestBlock({}, { template: "<div></div><div></div>" });

    expect(() => block.element()).toThrow(/один корневой элемент/);
  });

  it("setProps merges props and replaces the element in the DOM", () => {
    const block = new TestBlock(
      { title: "a", extra: "x" },
      { template: "<p>{{title}}|{{extra}}</p>" },
    );
    const parent = document.createElement("div");

    parent.append(block.element());
    block.setProps({ title: "b" });

    expect(parent.children).toHaveLength(1);
    expect(parent.firstElementChild).toBe(block.element());
    expect(block.element().textContent).toBe("b|x");
  });

  it("calls lifecycle hooks: mount once, update on re-render, unmount on destroy", () => {
    const block = new TestBlock();

    block.element();
    block.setProps({ title: "x" });
    block.destroy();

    expect(block.hooks.didMount).toHaveBeenCalledTimes(1);
    expect(block.hooks.didUpdate).toHaveBeenCalledTimes(1);
    expect(block.hooks.willUnmount).toHaveBeenCalledTimes(1);
  });

  it("does not duplicate listeners after re-render and removes them on destroy", () => {
    const onClick = vi.fn<(event: MouseEvent) => void>();
    const block = new TestBlock({}, { events: { click: onClick } });
    const click = (): MouseEvent => new MouseEvent("click", { bubbles: true });

    block.element();
    block.setProps({ title: "x" });
    block.element().dispatchEvent(click());

    expect(onClick).toHaveBeenCalledTimes(1);

    const element = block.element();

    block.destroy();
    element.dispatchEvent(click());

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("returns an element by ref and throws for an unknown one", () => {
    const block = new TestBlock({ title: "x" });
    const element = block.element();

    expect(block.ref("label")).toBe(element.querySelector("span"));
    expect(() => block.ref("unknown")).toThrow("Не найден ref: unknown");
  });
});
