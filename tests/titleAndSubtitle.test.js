// tests/slides/titleAndSubtitle.test.js

import { describe, test, expect } from "vitest";
import { TitleAndSubtitleSlide } from "../src/slideTemplates/TitleAndSubtitleSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("TitleAndSubtitleSlide", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "titleAndSubtitle");

    const { html } = TitleAndSubtitleSlide(raw);

    expect(html).toContain("titleAndSubtitle");
    expect(html).toContain("<h1");
    if (raw.data.find(d => d.name === "subtitle")) {
      expect(html).toContain("<h2");
    }
  });

  test("renders title without subtitle", () => {
    const raw = {
      type: "titleAndSubtitle",
      data: [{ name: "title", content: "Only title" }]
    };

    const { html } = TitleAndSubtitleSlide(raw);

    expect(html).toContain("<h1");
    expect(html).not.toContain("<h2");
  });

  test("throws if title missing", () => {
    const raw = {
      type: "titleAndSubtitle",
      data: [{ name: "subtitle", content: "Only subtitle" }]
    };

    expect(() => TitleAndSubtitleSlide(raw)).toThrow();
  });

  test("applies classes correctly", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "titleAndSubtitle");

    const data = {
      ...raw,
      data: raw.data.map(d => {
        if (d.name === "title") return { ...d, classes: "big-title" };
        if (d.name === "subtitle") return { ...d, classes: "subtle" };
        return d;
      })
    };

    const { html } = TitleAndSubtitleSlide(data);

    expect(html).toContain("big-title");
    expect(html).toContain("subtle");
  });

});