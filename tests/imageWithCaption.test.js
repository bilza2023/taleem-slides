
import { describe, test, expect } from "vitest";
import { ImageWithCaptionSlide } from "../src/slideTemplates/ImageWithCaptionSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("ImageWithCaptionSlide (pure)", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageWithCaption");

    const { html } = ImageWithCaptionSlide(raw);

    expect(html).toContain("imageWithCaption");
    expect(html).toContain("<img");
  });

  test("renders caption if present", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageWithCaption");

    const { html } = ImageWithCaptionSlide(raw);

    const caption = raw.data.find(d => d.name === "caption")?.content;

    if (caption) {
      expect(html).toContain(caption);
    }
  });

  test("returns animation + ids", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageWithCaption");

    const { animation, ids } = ImageWithCaptionSlide(raw);

    expect(animation).toBe("progressiveReveal");
    expect(ids.length).toBe(raw.data.length);
  });

  test("all ids exist in html", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "imageWithCaption");

    const { html, ids } = ImageWithCaptionSlide(raw);

    ids.forEach(id => {
      expect(html).toContain(`id="${id}"`);
    });
  });

  test("throws if image missing", () => {
    const raw = { type: "imageWithCaption", data: [] };

    expect(() => ImageWithCaptionSlide(raw)).toThrow();
  });

});