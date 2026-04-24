import { describe, test, expect } from "vitest";
import { TextGridSlide } from "../src/slideTemplates/TextGrid.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("TextGridSlide (pure)", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "textGrid");

    const { html } = TextGridSlide(raw);

    expect(html).toContain("textGrid");
    expect(html).toContain("text-grid");
    expect(html).toContain("text-grid-item");
  });

  test("renders all text items", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "textGrid");

    const { html } = TextGridSlide(raw);

    const textCount = raw.data.filter(d => d.name === "text").length;
    const renderedCount = (html.match(/text-grid-item/g) || []).length;

    expect(renderedCount).toBe(textCount);
  });

  test("returns animation + ids", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "textGrid");

    const { animation, ids } = TextGridSlide(raw);

    expect(animation).toBe("progressiveReveal");
    expect(ids.length).toBe(raw.data.length);
  });

  test("all ids exist in html", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "textGrid");

    const { html, ids } = TextGridSlide(raw);

    ids.forEach(id => {
      expect(html).toContain(`id="${id}"`);
    });
  });

  test("throws if no text items", () => {
    const raw = { type: "textGrid", data: [] };

    expect(() => TextGridSlide(raw)).toThrow();
  });

});