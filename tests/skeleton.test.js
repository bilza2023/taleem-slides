
import { describe, test, expect } from "vitest";
import { SkeletonSlide } from "../src/slideTemplates/SkeletonSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("SkeletonSlide (pure)", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "skeleton");

    const { html } = SkeletonSlide(raw);

    expect(html).toContain("skeleton");
    expect(html).toContain("skeleton-body");
  });

  test("renders all items", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "skeleton");

    const { html } = SkeletonSlide(raw);

    raw.data.forEach(d => {
      if (d.content) {
        expect(html).toContain(d.content);
      }
    });
  });

  test("renders images correctly", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "skeleton");

    const { html } = SkeletonSlide(raw);

    const images = raw.data.filter(d => d.name === "image");

    images.forEach(img => {
      expect(html).toContain(img.content);
    });
  });

  test("returns animation + ids", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "skeleton");

    const { animation, ids } = SkeletonSlide(raw);

    expect(animation).toBe("oneAtATime");
    expect(ids.length).toBe(raw.data.length);
  });

  test("all ids exist in html", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "skeleton");

    const { html, ids } = SkeletonSlide(raw);

    ids.forEach(id => {
      expect(html).toContain(`id="${id}"`);
    });
  });

  test("throws if no items", () => {
    const raw = { type: "skeleton", data: [] };

    expect(() => SkeletonSlide(raw)).toThrow();
  });

});