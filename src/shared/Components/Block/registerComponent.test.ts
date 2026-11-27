import { beforeAll, beforeEach, describe, expect, it } from "vitest";

import { ChildBlock, TestBlock, WrapperBlock } from "./testUtils";
import type { ITestProps } from "./testUtils";
import { registerComponent } from "@/shared/helpers/registerComponent";

function createHost(template: string, props: ITestProps = {}): TestBlock {
  return new TestBlock(props, { template });
}

describe("registerComponent", () => {
  beforeAll(() => {
    registerComponent(ChildBlock);
    registerComponent(WrapperBlock);
  });

  beforeEach(() => {
    ChildBlock.instances = [];
  });

  it("renders the component in place of the placeholder with props from context", () => {
    const element = createHost(
      "<div><p>before</p>{{TestChild title=name}}<p>after</p></div>",
      { name: "Ann" },
    ).element();

    expect(Array.from(element.children).map((node) => node.tagName)).toEqual([
      "P",
      "DIV",
      "P",
    ]);
    expect(element.querySelector(".child")?.textContent).toBe("Ann");
    expect(element.querySelector("[data-component-placeholder]")).toBeNull();
  });

  it("renders nested components inside a block-form wrapper", () => {
    const element = createHost(
      '<div>{{#TestWrapper}}{{TestChild title="inner"}}{{/TestWrapper}}</div>',
    ).element();

    expect(element.querySelector(".wrapper .child")?.textContent).toBe("inner");
  });

  it("escapes user content inside the block (XSS)", () => {
    const payload = "<script>alert(1)</script>";
    const element = createHost(
      "<div>{{#TestWrapper}}{{name}}{{/TestWrapper}}</div>",
      { name: payload },
    ).element();

    expect(element.querySelector("script")).toBeNull();
    expect(element.querySelector(".wrapper")?.textContent).toBe(payload);
  });

  it("destroys child components when the parent is destroyed", () => {
    const host = createHost('<div>{{TestChild title="x"}}</div>');

    host.element();
    host.destroy();

    expect(ChildBlock.instances[0].hooks.willUnmount).toHaveBeenCalledTimes(1);
  });

  it("recreates children on parent re-render and destroys the old ones", () => {
    const host = createHost("<div>{{TestChild title=name}}</div>", {
      name: "a",
    });

    host.element();
    host.setProps({ name: "b" });

    expect(ChildBlock.instances).toHaveLength(2);
    expect(ChildBlock.instances[0].hooks.willUnmount).toHaveBeenCalledTimes(1);
    expect(host.element().querySelector(".child")?.textContent).toBe("b");
  });
});
