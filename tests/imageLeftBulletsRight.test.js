
import { describe, test, expect } from "vitest";
import { ImageLeftBulletsRightSlide } from "../src/slideTemplates/ImageLeftBulletsRightSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("ImageLeftBulletsRightSlide (pure)", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageLeftBulletsRight");

    const { html } = ImageLeftBulletsRightSlide(raw);

    expect(html).toContain("imageLeftBulletsRight");
    expect(html).toContain("<img");
    expect(html).toContain("<ul");
    expect(html).toContain("<li");
  });

  test("renders image correctly", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageLeftBulletsRight");

    const { html } = ImageLeftBulletsRightSlide(raw);

    const img = raw.data.find(d => d.name === "image").content;

    expect(html).toContain(img);
  });

  test("renders all bullets", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageLeftBulletsRight");

    const { html } = ImageLeftBulletsRightSlide(raw);

    const bulletCount = raw.data.filter(d => d.name === "bullet").length;
    const renderedCount = (html.match(/<li/g) || []).length;

    expect(renderedCount).toBe(bulletCount);
  });

  test("returns animation + ids", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageLeftBulletsRight");

    const { animation, ids } = ImageLeftBulletsRightSlide(raw);

    expect(animation).toBe("progressiveReveal");
    expect(ids.length).toBe(raw.data.length);
  });

  test("all ids exist in html", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageLeftBulletsRight");

    const { html, ids } = ImageLeftBulletsRightSlide(raw);

    ids.forEach(id => {
      expect(html).toContain(`id="${id}"`);
    });
  });

  test("throws if missing image or bullets", () => {
    const raw = { type: "imageLeftBulletsRight", data: [] };

    expect(() => ImageLeftBulletsRightSlide(raw)).toThrow();
  });

});