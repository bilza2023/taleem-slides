import { describe, test, expect } from "vitest";
import { BarChartSlide } from "../src/slideTemplates/BarChartSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("BarChartSlide (pure)", () => {

  test("renders bar chart structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "barChart");

    const { html } = BarChartSlide(raw); // ✅ FIX

    expect(html).toContain("barChart");
    expect(html).toContain("bar-row");
    expect(html).toContain("bar-fill");
  });

  test("renders all bars", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "barChart");

    const { html } = BarChartSlide(raw); // ✅ FIX

    const barCount = raw.data.filter(d => d.name === "bar").length;
    const renderedCount = (html.match(/bar-row/g) || []).length;

    expect(renderedCount).toBe(barCount);
  });

  test("applies classes correctly", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "barChart");

    const data = {
      ...raw,
      data: raw.data.map((d, i) =>
        d.name === "bar"
          ? { ...d, classes: i === 0 ? "first" : i === 1 ? "second" : "" }
          : d
      )
    };

    const { html } = BarChartSlide(data); // ✅ FIX

    expect(html).toContain("first");
    expect(html).toContain("second");
  });

});