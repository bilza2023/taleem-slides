import { describe, test, expect } from "vitest";
import { FillImageSlide } from "../src/slideTemplates/FillImageSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("FillImageSlide (pure)", () => {

  test("renders fill image structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "fillImage");

    const { html } = FillImageSlide(raw);

    expect(html).toContain("fillImage");
    expect(html).toContain("<img");
  });

  test("renders image src correctly", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "fillImage");

    const { html } = FillImageSlide(raw);

    const image = raw.data.find(d => d.name === "image").content;

    expect(html).toContain(image);
  });

  test("returns animation + ids", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "fillImage");

    const { animation, ids } = FillImageSlide(raw);

    expect(animation).toBe("progressiveReveal");
    expect(ids.length).toBe(raw.data.length);
  });

  test("all ids exist in html", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "fillImage");

    const { html, ids } = FillImageSlide(raw);

    ids.forEach(id => {
      expect(html).toContain(`id="${id}"`);
    });
  });

  test("throws if image missing", () => {
    const raw = { type: "fillImage", data: [] };

    expect(() => FillImageSlide(raw)).toThrow();
  });

});