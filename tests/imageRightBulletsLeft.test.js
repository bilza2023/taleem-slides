import { describe, test, expect } from "vitest";
import { ImageRightBulletsLeftSlide } from "../src/slideTemplates/ImageRightBulletsLeftSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("ImageRightBulletsLeftSlide (pure)", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageRightBulletsLeft");

    const { html } = ImageRightBulletsLeftSlide(raw);

    expect(html).toContain("imageRightBulletsLeft");
    expect(html).toContain("<img");
    expect(html).toContain("<ul");
    expect(html).toContain("<li");
  });

  test("renders image correctly", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageRightBulletsLeft");

    const { html } = ImageRightBulletsLeftSlide(raw);

    const img = raw.data.find(d => d.name === "image").content;

    expect(html).toContain(img);
  });

  test("renders all bullets", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageRightBulletsLeft");

    const { html } = ImageRightBulletsLeftSlide(raw);

    const bulletCount = raw.data.filter(d => d.name === "bullet").length;
    const renderedCount = (html.match(/<li/g) || []).length;

    expect(renderedCount).toBe(bulletCount);
  });

  test("returns animation + ids", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageRightBulletsLeft");

    const { animation, ids } = ImageRightBulletsLeftSlide(raw);

    expect(animation).toBe("progressiveReveal");
    expect(ids.length).toBe(raw.data.length);
  });

  test("all ids exist in html", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageRightBulletsLeft");

    const { html, ids } = ImageRightBulletsLeftSlide(raw);

    ids.forEach(id => {
      expect(html).toContain(`id="${id}"`);
    });
  });

  test("throws if missing image or bullets", () => {
    const raw = { type: "imageRightBulletsLeft", data: [] };

    expect(() => ImageRightBulletsLeftSlide(raw)).toThrow();
  });

});