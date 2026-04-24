import { describe, test, expect } from "vitest";
import { TwoColumnTextSlide } from "../src/slideTemplates/TwoColumnTextSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("TwoColumnTextSlide (pure)", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "twoColumnText");

    const { html } = TwoColumnTextSlide(raw);

    expect(html).toContain("twoColumnText");
    expect(html).toContain("col left");
    expect(html).toContain("col right");
  });

  test("renders left and right content", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "twoColumnText");

    const { html } = TwoColumnTextSlide(raw);

    raw.data.forEach(d => {
      if (d.content) {
        expect(html).toContain(d.content);
      }
    });
  });

  test("renders images correctly", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "twoColumnText");

    const { html } = TwoColumnTextSlide(raw);

    const imageItems = raw.data.filter(d => d.name.includes("Image"));

    imageItems.forEach(img => {
      expect(html).toContain(img.content);
    });
  });

  test("returns animation + ids", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "twoColumnText");

    const { animation, ids } = TwoColumnTextSlide(raw);

    expect(animation).toBe("progressiveReveal");
    expect(ids.length).toBe(raw.data.length);
  });

  test("all ids exist in html", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "twoColumnText");

    const { html, ids } = TwoColumnTextSlide(raw);

    ids.forEach(id => {
      expect(html).toContain(`id="${id}"`);
    });
  });

  test("throws if missing left or right content", () => {
    const raw = { type: "twoColumnText", data: [] };

    expect(() => TwoColumnTextSlide(raw)).toThrow();
  });

});