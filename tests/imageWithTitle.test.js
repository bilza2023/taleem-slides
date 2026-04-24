import { describe, test, expect } from "vitest";
import { ImageWithTitleSlide } from "../src/slideTemplates/ImageWithTitleSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("ImageWithTitleSlide (pure)", () => {

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

  test("returns animation + ids", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageWithTitle");

    const { animation, ids } = ImageWithTitleSlide(raw);

    expect(animation).toBe("progressiveReveal");
    expect(ids.length).toBe(raw.data.length);
  });

  test("all ids exist in html", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageWithTitle");

    const { html, ids } = ImageWithTitleSlide(raw);

    ids.forEach(id => {
      expect(html).toContain(`id="${id}"`);
    });
  });

  test("throws if missing title or image", () => {
    const raw = { type: "imageWithTitle", data: [] };

    expect(() => ImageWithTitleSlide(raw)).toThrow();
  });

});