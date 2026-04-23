// tests/slides/twoColumnText.test.js

import { describe, test, expect } from "vitest";
import { TwoColumnTextSlide } from "../src/slideTemplates/TwoColumnTextSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("TwoColumnTextSlide", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "twoColumnText");

    const { html } = TwoColumnTextSlide(raw);

    expect(html).toContain("twoColumnText");
    expect(html).toContain("col left");
    expect(html).toContain("col right");
  });

  test("renders content", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "twoColumnText");

    const { html } = TwoColumnTextSlide(raw);

    raw.data.forEach(d => {
      expect(html).toContain(d.content);
    });
  });

  test("renders images", () => {
    const raw = {
      type: "twoColumnText",
      data: [
        { name: "leftImage", content: "left.png" },
        { name: "rightImage", content: "right.png" }
      ]
    };

    const { html } = TwoColumnTextSlide(raw);

    expect(html).toContain("left.png");
    expect(html).toContain("right.png");
    expect(html).toContain("<img");
  });

  test("throws if missing sides", () => {
    const raw = {
      type: "twoColumnText",
      data: [{ name: "leftText", content: "Only left" }]
    };

    expect(() => TwoColumnTextSlide(raw)).toThrow();
  });

});