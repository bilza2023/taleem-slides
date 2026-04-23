// tests/fillImage.test.js

import { describe, test, expect } from "vitest";
import { FillImageSlide } from "../src/slideTemplates/FillImageSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("FillImageSlide", () => {

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

  test("throws if image missing", () => {
    const raw = { type: "fillImage", data: [] };

    expect(() => FillImageSlide(raw)).toThrow();
  });

});