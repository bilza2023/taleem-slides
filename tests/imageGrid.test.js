import { describe, test, expect } from "vitest";
import { ImageGridSlide } from "../src/slideTemplates/ImageGrid.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("ImageGridSlide (pure)", () => {

  test("renders image grid structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageGrid");

    const { html } = ImageGridSlide(raw);

    expect(html).toContain("imageGrid");
    expect(html).toContain("image-grid");
    expect(html).toContain("<img");
  });

  test("renders all images", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageGrid");

    const { html } = ImageGridSlide(raw);

    const imgCount = raw.data.filter(d => d.name === "image").length;
    const renderedCount = (html.match(/<img/g) || []).length;

    expect(renderedCount).toBe(imgCount);
  });

  test("returns animation + ids", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageGrid");

    const { animation, ids } = ImageGridSlide(raw);

    expect(animation).toBe("progressiveReveal");
    expect(ids.length).toBe(raw.data.length);
  });

  test("all ids exist in html", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageGrid");

    const { html, ids } = ImageGridSlide(raw);

    ids.forEach(id => {
      expect(html).toContain(`id="${id}"`);
    });
  });

  test("throws if no images provided", () => {
    const raw = { type: "imageGrid", data: [] };

    expect(() => ImageGridSlide(raw)).toThrow();
  });

});