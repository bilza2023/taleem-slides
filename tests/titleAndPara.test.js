// tests/slides/titleAndPara.test.js

import { describe, test, expect } from "vitest";
import { TitleAndParaSlide } from "../src/slideTemplates/TitleAndParaSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("TitleAndParaSlide", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "titleAndPara");

    const { html } = TitleAndParaSlide(raw);

    expect(html).toContain("titleAndPara");
    expect(html).toContain("<p");
  });

  test("renders title and para correctly", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "titleAndPara");

    const { html } = TitleAndParaSlide(raw);

    const para = raw.data.find(d => d.name === "para").content;
    const title = raw.data.find(d => d.name === "title")?.content;

    expect(html).toContain(para);
    if (title) expect(html).toContain(title);
  });

  test("renders without title if missing", () => {
    const raw = {
      type: "titleAndPara",
      data: [{ name: "para", content: "Only para" }]
    };

    const { html } = TitleAndParaSlide(raw);

    expect(html).toContain("Only para");
    expect(html).not.toContain("<h1");
  });

  test("throws if para missing", () => {
    const raw = { type: "titleAndPara", data: [] };

    expect(() => TitleAndParaSlide(raw)).toThrow();
  });

});