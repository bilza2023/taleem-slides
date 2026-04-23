// tests/slides/imageLeftBulletsRight.test.js

import { describe, test, expect } from "vitest";
import { ImageLeftBulletsRightSlide } from "../src/slideTemplates/ImageLeftBulletsRightSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("ImageLeftBulletsRightSlide", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageLeftBulletsRight");

    const { html } = ImageLeftBulletsRightSlide(raw);

    expect(html).toContain("imageLeftBulletsRight");
    expect(html).toContain("<img");
    expect(html).toContain("<ul");
    expect(html).toContain("<li");
  });

  test("renders all bullets", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageLeftBulletsRight");

    const { html } = ImageLeftBulletsRightSlide(raw);

    const bulletCount = raw.data.filter(d => d.name === "bullet").length;
    const renderedCount = (html.match(/<li/g) || []).length;

    expect(renderedCount).toBe(bulletCount);
  });

  test("applies classes correctly", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageLeftBulletsRight");

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

    const { html } = ImageLeftBulletsRightSlide(data);

    expect(html).toContain("first");
    expect(html).toContain("second");
  });

});