import { describe, test, expect } from "vitest";
import { KeyIdeasSlide } from "../src/slideTemplates/KeyIdeasSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("KeyIdeasSlide (pure)", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "keyIdeasSlide");

    const { html } = KeyIdeasSlide(raw);

    expect(html).toContain("keyIdeasSlide");
    expect(html).toContain("key-idea");
  });

  test("renders all cards", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "keyIdeasSlide");

    const { html } = KeyIdeasSlide(raw);

    const cardCount = raw.data.filter(d => d.name === "card").length;
    const renderedCount = (html.match(/key-idea/g) || []).length;

    expect(renderedCount).toBe(cardCount);
  });

  test("renders icon and label", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "keyIdeasSlide");

    const { html } = KeyIdeasSlide(raw);

    raw.data.forEach(d => {
      if (d.name === "card") {
        expect(html).toContain(d.label);
        if (d.icon) {
          expect(html).toContain(d.icon);
        }
      }
    });
  });

  test("returns animation + ids", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "keyIdeasSlide");

    const { animation, ids } = KeyIdeasSlide(raw);

    expect(animation).toBe("progressiveReveal");
    expect(ids.length).toBe(raw.data.length);
  });

  test("all ids exist in html", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "keyIdeasSlide");

    const { html, ids } = KeyIdeasSlide(raw);

    ids.forEach(id => {
      expect(html).toContain(`id="${id}"`);
    });
  });

  test("throws if no cards provided", () => {
    const raw = { type: "keyIdeasSlide", data: [] };

    expect(() => KeyIdeasSlide(raw)).toThrow();
  });

});