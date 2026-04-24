import { describe, test, expect } from "vitest";
import { TitleAndParaSlide } from "../src/slideTemplates/TitleAndParaSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("TitleAndParaSlide (pure)", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "titleAndPara");

    const { html } = TitleAndParaSlide(raw);

    expect(html).toContain("titleAndPara");
    expect(html).toContain("<p");
  });

  test("renders title if present", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "titleAndPara");

    const { html } = TitleAndParaSlide(raw);

    const title = raw.data.find(d => d.name === "title")?.content;

    if (title) {
      expect(html).toContain(title);
    }
  });

  test("renders paragraph correctly", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "titleAndPara");

    const { html } = TitleAndParaSlide(raw);

    const para = raw.data.find(d => d.name === "para").content;

    expect(html).toContain(para);
  });

  test("returns animation + ids", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "titleAndPara");

    const { animation, ids } = TitleAndParaSlide(raw);

    expect(animation).toBe("progressiveReveal");
    expect(ids.length).toBe(raw.data.length);
  });

  test("all ids exist in html", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "titleAndPara");

    const { html, ids } = TitleAndParaSlide(raw);

    ids.forEach(id => {
      expect(html).toContain(`id="${id}"`);
    });
  });

  test("throws if no data", () => {
    const raw = { type: "titleAndPara", data: [] };

    expect(() => TitleAndParaSlide(raw)).toThrow();
  });

  test("throws if para missing", () => {
    const raw = { type: "titleAndPara", data: [{ name: "title", content: "Only title" }] };

    expect(() => TitleAndParaSlide(raw)).toThrow();
  });

});