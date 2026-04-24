import { describe, test, expect } from "vitest";
import { TitleAndSubtitleSlide } from "../src/slideTemplates/TitleAndSubtitleSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("TitleAndSubtitleSlide (pure)", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "titleAndSubtitle");

    const { html } = TitleAndSubtitleSlide(raw);

    expect(html).toContain("titleAndSubtitle");
    expect(html).toContain("<h1");
  });

  test("renders title correctly", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "titleAndSubtitle");

    const { html } = TitleAndSubtitleSlide(raw);

    const title = raw.data.find(d => d.name === "title").content;

    expect(html).toContain(title);
  });

  test("renders subtitle if present", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "titleAndSubtitle");

    const { html } = TitleAndSubtitleSlide(raw);

    const subtitle = raw.data.find(d => d.name === "subtitle")?.content;

    if (subtitle) {
      expect(html).toContain(subtitle);
    }
  });

  test("returns animation + ids", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "titleAndSubtitle");

    const { animation, ids } = TitleAndSubtitleSlide(raw);

    expect(animation).toBe("progressiveReveal");
    expect(ids.length).toBe(raw.data.length);
  });

  test("all ids exist in html", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "titleAndSubtitle");

    const { html, ids } = TitleAndSubtitleSlide(raw);

    ids.forEach(id => {
      expect(html).toContain(`id="${id}"`);
    });
  });

  test("throws if no data", () => {
    const raw = { type: "titleAndSubtitle", data: [] };

    expect(() => TitleAndSubtitleSlide(raw)).toThrow();
  });

  test("throws if title missing", () => {
    const raw = { type: "titleAndSubtitle", data: [{ name: "subtitle", content: "Only subtitle" }] };

    expect(() => TitleAndSubtitleSlide(raw)).toThrow();
  });

});