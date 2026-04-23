import { describe, test, expect } from "vitest";
import { BulletListSlide } from "../src/slideTemplates/BulletListSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("BulletListSlide (pure)", () => {

  test("renders bullet list structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "bulletList");

    const { html } = BulletListSlide(raw); // ✅ FIX

    expect(html).toContain("bulletList");
    expect(html).toContain("<ul");
    expect(html).toContain("<li");
  });

  test("renders all bullets", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "bulletList");

    const { html } = BulletListSlide(raw); // ✅ FIX

    const bulletCount = raw.data.filter(d => d.name === "bullet").length;
    const renderedCount = (html.match(/<li/g) || []).length;

    expect(renderedCount).toBe(bulletCount);
  });

  test("applies classes correctly to bullets", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "bulletList");

    const data = {
      ...raw,
      data: raw.data.map((d, i) =>
        d.name === "bullet"
          ? { ...d, classes: i === 0 ? "first" : i === 1 ? "second" : "" }
          : d
      )
    };

    const { html } = BulletListSlide(data); // ✅ FIX

    expect(html).toContain("first");
    expect(html).toContain("second");
  });

  test("renders heading if provided", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "bulletList");

    const data = {
      ...raw,
      data: [
        { name: "heading", content: "My Heading" },
        ...raw.data
      ]
    };

    const { html } = BulletListSlide(data); // ✅ FIX

    expect(html).toContain("<h1");
    expect(html).toContain("My Heading");
  });

});