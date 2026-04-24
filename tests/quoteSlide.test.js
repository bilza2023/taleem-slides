
import { describe, test, expect } from "vitest";
import { QuoteSlide } from "../src/slideTemplates/QuoteSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("QuoteSlide (pure)", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "quoteSlide");

    const { html } = QuoteSlide(raw);

    expect(html).toContain("quoteSlide");
    expect(html).toContain("<blockquote");
    expect(html).toContain("<p");
  });

  test("renders quote content", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "quoteSlide");

    const { html } = QuoteSlide(raw);

    const quote = raw.data.find(d => d.name === "quote").content;

    expect(html).toContain(quote);
  });

  test("renders author if present", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "quoteSlide");

    const { html } = QuoteSlide(raw);

    const author = raw.data.find(d => d.name === "author")?.content;

    if (author) {
      expect(html).toContain(author);
    }
  });

  test("returns animation + ids", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "quoteSlide");

    const { animation, ids } = QuoteSlide(raw);

    expect(animation).toBe("progressiveReveal");
    expect(ids.length).toBe(raw.data.length);
  });

  test("all ids exist in html", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "quoteSlide");

    const { html, ids } = QuoteSlide(raw);

    ids.forEach(id => {
      expect(html).toContain(`id="${id}"`);
    });
  });

  test("throws if quote missing", () => {
    const raw = { type: "quoteSlide", data: [] };

    expect(() => QuoteSlide(raw)).toThrow();
  });

});