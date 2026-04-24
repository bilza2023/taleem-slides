import { describe, test, expect } from "vitest";
import { TableSlide } from "../src/slideTemplates/TableSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("TableSlide (pure)", () => {

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

    const rowCount = raw.data.filter(d => d.name === "row").length;
    const renderedCount = (html.match(/<tr/g) || []).length;

    expect(renderedCount).toBe(rowCount);
  });

  test("splits row content into cells", () => {
    const raw = {
      type: "table",
      data: [
        { name: "row", content: "A, B, C" }
      ]
    };

    const { html } = TableSlide(raw);

    expect(html).toContain("<td>A</td>");
    expect(html).toContain("<td>B</td>");
    expect(html).toContain("<td>C</td>");
  });

  test("returns animation + ids", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "table");

    const { animation, ids } = TableSlide(raw);

    expect(animation).toBe("progressiveReveal");
    expect(ids.length).toBe(raw.data.length);
  });

  test("all ids exist in html", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "table");

    const { html, ids } = TableSlide(raw);

    ids.forEach(id => {
      expect(html).toContain(`id="${id}"`);
    });
  });

  test("throws if no rows provided", () => {
    const raw = { type: "table", data: [] };

    expect(() => TableSlide(raw)).toThrow();
  });

});