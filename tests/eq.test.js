// tests/slides/eq.test.js

import { describe, test, expect } from "vitest";
import { EqSlide } from "../src/slideTemplates/EqSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("EqSlide (pure)", () => {

  test("renders eq structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "eq");

    const { html } = EqSlide(raw);

    expect(html).toContain("eq");
    expect(html).toContain("eq-lines");
    expect(html).toContain("eq-side-panel");
  });

  test("renders all lines", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "eq");

    const { html } = EqSlide(raw);

    const lineCount = raw.data.length;

    const renderedCount =
      (html.match(/<li\s+id=".*?"\s+class="eq-line/g) || []).length;

    expect(renderedCount).toBe(lineCount);
  });

  test("renders spItems content (text + image)", () => {
    const raw = {
      type: "eq",
      data: [
        {
          name: "math",
          content: "x^2",
          spItems: [
            { name: "text", content: "explain" },
            { name: "image", content: "/test.png" }
          ]
        }
      ]
    };

    const { html } = EqSlide(raw);

    expect(html).toContain("explain");
    expect(html).toContain("<img");
    expect(html).toContain("/test.png");
  });

});