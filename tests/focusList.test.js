import { describe, test, expect } from "vitest";
import { FocusListSlide } from "../src/slideTemplates/FocusList.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("FocusListSlide (pure)", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "focusList");

    const { html } = FocusListSlide(raw);

    expect(html).toContain("focusList");
    expect(html).toContain("<ul");
    expect(html).toContain("<li");
  });

  test("renders all bullets", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "focusList");

    const { html } = FocusListSlide(raw);

    const count = raw.data.filter(d => d.name === "bullet").length;
    const rendered = (html.match(/<li/g) || []).length;

    expect(rendered).toBe(count);
  });

  test("renders heading if present", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "focusList");

    const { html } = FocusListSlide(raw);

    const heading = raw.data.find(d => d.name === "heading")?.content;

    if (heading) {
      expect(html).toContain(heading);
    }
  });

  test("returns correct animation + ids", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "focusList");

    const { animation, ids } = FocusListSlide(raw);

    expect(animation).toBe("highlightOne");
    expect(ids.length).toBe(raw.data.length);
  });

  test("all ids exist in html", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "focusList");

    const { html, ids } = FocusListSlide(raw);

    ids.forEach(id => {
      expect(html).toContain(`id="${id}"`);
    });
  });

  test("throws if no bullets", () => {
    const raw = { type: "focusList", data: [] };

    expect(() => FocusListSlide(raw)).toThrow();
  });

});