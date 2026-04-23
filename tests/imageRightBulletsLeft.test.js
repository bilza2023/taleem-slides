// tests/slides/imageRightBulletsLeft.test.js

import { describe, test, expect } from "vitest";
import { ImageRightBulletsLeftSlide } from "../src/slideTemplates/ImageRightBulletsLeftSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("ImageRightBulletsLeftSlide", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageRightBulletsLeft");

    const { html } = ImageRightBulletsLeftSlide(raw);

    expect(html).toContain("imageRightBulletsLeft");
    expect(html).toContain("<img");
    expect(html).toContain("<ul");
    expect(html).toContain("<li");
  });

  test("renders all bullets", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageRightBulletsLeft");

    const { html } = ImageRightBulletsLeftSlide(raw);

    const bulletCount = raw.data.filter(d => d.name === "bullet").length;
    const renderedCount = (html.match(/<li/g) || []).length;

    expect(renderedCount).toBe(bulletCount);
  });

  test("applies classes correctly", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageRightBulletsLeft");

    let bulletIndex = -1;

    const data = {
      ...raw,
      data: raw.data.map(d => {
        if (d.name === "bullet") {
          bulletIndex++;
          return {
            ...d,
            classes:
              bulletIndex === 0
                ? "first"
                : bulletIndex === 1
                ? "second"
                : ""
          };
        }
        return d;
      })
    };

    const { html } = ImageRightBulletsLeftSlide(data);

    expect(html).toContain("first");
    expect(html).toContain("second");
  });

});