import { describe, test, expect } from "vitest";
import { ImageStripSlide } from "../src/slideTemplates/ImagesStrip.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("ImageStripSlide (pure)", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageStrip");

    const { html } = ImageStripSlide(raw);

    expect(html).toContain("imageStrip");
    expect(html).toContain("image-strip");
    expect(html).toContain("<img");
  });

  test("renders all images", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageStrip");

    const { html } = ImageStripSlide(raw);

    const imgCount = raw.data.filter(d => d.name === "image").length;
    const renderedCount = (html.match(/<img/g) || []).length;

    expect(renderedCount).toBe(imgCount);
  });

  test("returns animation + ids", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageStrip");

    const { animation, ids } = ImageStripSlide(raw);

    expect(animation).toBe("progressiveReveal");
    expect(ids.length).toBe(raw.data.length);
  });

  test("all ids exist in html", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageStrip");

    const { html, ids } = ImageStripSlide(raw);

    ids.forEach(id => {
      expect(html).toContain(`id="${id}"`);
    });
  });

  test("throws if no images provided", () => {
    const raw = { type: "imageStrip", data: [] };

    expect(() => ImageStripSlide(raw)).toThrow();
  });

});