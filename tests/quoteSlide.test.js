// tests/slides/quoteSlide.test.js

import { describe, test, expect } from "vitest";
import { QuoteSlide } from "../src/slideTemplates/QuoteSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("QuoteSlide", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "quoteSlide");

    const { html } = QuoteSlide(raw);

    expect(html).toContain("quoteSlide");
    expect(html).toContain("<blockquote");
    expect(html).toContain("<p");
  });

  test("renders quote and author", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "quoteSlide");

    const { html } = QuoteSlide(raw);

    const quote = raw.data.find(d => d.name === "quote").content;
    const author = raw.data.find(d => d.name === "author")?.content;

    expect(html).toContain(quote);
    if (author) expect(html).toContain(author);
  });

  test("renders quote without author content", () => {
    const raw = {
      type: "quoteSlide",
      data: [{ name: "quote", content: "Test quote" }]
    };

    const { html } = QuoteSlide(raw);

    expect(html).toContain("Test quote");
    expect(html).not.toContain("<footer"); // ✅ FIX
  });

  test("throws when quote missing", () => {
    const raw = { type: "quoteSlide", data: [] };

    expect(() => QuoteSlide(raw)).toThrow(); // ✅ FIX
  });

});