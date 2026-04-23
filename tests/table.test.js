// tests/slides/table.test.js

import { describe, test, expect } from "vitest";
import { TableSlide } from "../src/slideTemplates/TableSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("TableSlide", () => {

  test("renders structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "table");

    const { html } = TableSlide(raw);

    expect(html).toContain("table");
    expect(html).toContain("<table");
    expect(html).toContain("<tr");
    expect(html).toContain("<td");
  });

  test("renders all rows", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "table");

    const { html } = TableSlide(raw);

    const rowCount = raw.data.length;
    const renderedCount = (html.match(/<tr/g) || []).length;

    expect(renderedCount).toBe(rowCount);
  });

  test("renders all cells", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "table");

    const { html } = TableSlide(raw);

    const cellCount = raw.data
      .map(r => r.content.split(",").length)
      .reduce((a, b) => a + b, 0);

    const renderedCount = (html.match(/<td/g) || []).length;

    expect(renderedCount).toBe(cellCount);
  });

  test("throws if invalid data", () => {
    const raw = { type: "table", data: [] };

    expect(() => TableSlide(raw)).toThrow();
  });

});