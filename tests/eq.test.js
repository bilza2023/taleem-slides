import { describe, test, expect } from "vitest";
import { EqSlide } from "../src/slideTemplates/EqSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("EqSlide (pure)", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "eq");

    const { html } = EqSlide(raw);

    expect(html).toContain("eq");
    expect(html).toContain("eq-lines");
    expect(html).toContain("eq-side-panel");
  });

  test("renders all lines", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "eq");

    const { html } = EqSlide(raw);

    const count = raw.data.length;

    // ✅ FIXED (avoid matching eq-lines)
    const rendered = (html.match(/class="eq-line\b/g) || []).length;

    expect(rendered).toBe(count);
  });

  test("renders side panel items", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "eq");

    const { html } = EqSlide(raw);

    const hasSp = raw.data.some(l => l.spItems?.length);

    if (hasSp) {
      expect(html).toContain("eq-explain-item");
    }
  });

  test("returns animation + ids", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "eq");

    const { animation, ids } = EqSlide(raw);

    expect(animation).toBe("highlightOne");

    // includes line ids + sp ids
    expect(ids.length).toBeGreaterThan(raw.data.length);
  });

  test("all ids exist in html", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "eq");

    const { html, ids } = EqSlide(raw);

    ids.forEach(id => {
      expect(html).toContain(`id="${id}"`);
    });
  });

  test("throws if no lines", () => {
    const raw = { type: "eq", data: [] };

    expect(() => EqSlide(raw)).toThrow();
  });

});