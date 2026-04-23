// tests/slides/imageWithCaption.test.js

import { describe, test, expect } from "vitest";
import { ImageWithCaptionSlide } from "../src/slideTemplates/ImageWithCaptionSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("ImageWithCaptionSlide", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageWithCaption");

    const { html } = ImageWithCaptionSlide(raw);

    expect(html).toContain("imageWithCaption");
    expect(html).toContain("<img");
    expect(html).toContain("<figcaption");
  });

  test("renders image and caption correctly", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageWithCaption");

    const { html } = ImageWithCaptionSlide(raw);

    const image = raw.data.find(d => d.name === "image").content;
    const caption = raw.data.find(d => d.name === "caption").content;

    expect(html).toContain(image);
    expect(html).toContain(caption);
  });

});