import { describe, test, expect } from "vitest";
import { Progressbar } from "../src/slideTemplates/Progressbar.js";

describe("Progressbar (pure)", () => {

  test("renders structure", () => {
    const raw = {
      type: "progressbar",
      data: [
        { name: "bar", label: "Test", value: 50 }
      ]
    };

    const { html } = Progressbar(raw);

    expect(html).toContain("progressbar");
    expect(html).toContain("progressbar-item");
    expect(html).toContain("progressbar-fill");
  });

  test("returns animation type", () => {
    const raw = {
      type: "progressbar",
      data: [{ name: "bar", label: "Test", value: 50 }]
    };

    const { animation } = Progressbar(raw);

    expect(animation).toBe("progressiveReveal");
  });

  test("returns ids for all items", () => {
    const raw = {
      type: "progressbar",
      data: [
        { name: "bar", label: "A", value: 20 },
        { name: "bar", label: "B", value: 40 }
      ]
    };

    const { ids } = Progressbar(raw);

    expect(ids.length).toBe(raw.data.length);
  });

  test("renders all bars", () => {
    const raw = {
      type: "progressbar",
      data: [
        { name: "bar", label: "A", value: 20 },
        { name: "bar", label: "B", value: 40 }
      ]
    };

    const { html } = Progressbar(raw);

    const renderedCount = (html.match(/progressbar-item/g) || []).length;

    expect(renderedCount).toBe(2);
  });

  test("clamps values between 0 and 100", () => {
    const raw = {
      type: "progressbar",
      data: [
        { name: "bar", label: "A", value: 150 },
        { name: "bar", label: "B", value: -20 }
      ]
    };

    const { html } = Progressbar(raw);

    expect(html).toContain("width:100%");
    expect(html).toContain("width:0%");
  });

  test("renders empty section if no bars", () => {
    const raw = { type: "progressbar", data: [] };

    const { html, ids } = Progressbar(raw);

    expect(html).toContain("progressbar");
    expect(ids.length).toBe(0);
  });

  test("all ids are present in html", () => {
    const raw = {
      type: "progressbar",
      data: [
        { name: "bar", label: "A", value: 20 },
        { name: "bar", label: "B", value: 40 }
      ]
    };

    const { html, ids } = Progressbar(raw);

    ids.forEach(id => {
      expect(html).toContain(`id="${id}"`);
    });
  });

});