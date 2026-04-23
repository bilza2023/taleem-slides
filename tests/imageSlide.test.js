// tests/slides/imageSlide.test.js

import { describe, test, expect } from "vitest";
import { ImageSlide } from "../src/slideTemplates/ImageSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("ImageSlide", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageSlide");

    const { html } = ImageSlide(raw);

    expect(html).toContain("imageSlide");
    expect(html).toContain("<img");
  });

  test("renders image src correctly", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageSlide");

    const { html } = ImageSlide(raw);

    const image = raw.data.find(d => d.name === "image").content;

    expect(html).toContain(image);
  });

  test("throws if image missing", () => {
    const raw = { type: "imageSlide", data: [] };

    expect(() => ImageSlide(raw)).toThrow();
  });

});