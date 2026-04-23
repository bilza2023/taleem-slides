// tests/slides/imageWithTitle.test.js

import { describe, test, expect } from "vitest";
import { ImageWithTitleSlide } from "../src/slideTemplates/ImageWithTitleSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("ImageWithTitleSlide", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageWithTitle");

    const { html } = ImageWithTitleSlide(raw);

    expect(html).toContain("imageWithTitle");
    expect(html).toContain("<h1");
    expect(html).toContain("<img");
  });

  test("renders title and image correctly", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageWithTitle");

    const { html } = ImageWithTitleSlide(raw);

    const title = raw.data.find(d => d.name === "title").content;
    const image = raw.data.find(d => d.name === "image").content;

    expect(html).toContain(title);
    expect(html).toContain(image);
  });

});