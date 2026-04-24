import { describe, test, expect } from "vitest";
import { BarChartSlide } from "../src/slideTemplates/BarChartSlide.js";
import goldenDeckV2 from "../public/GoldenDeckV2-8Apr2026.json";

describe("BarChartSlide (pure)", () => {

  test("renders bar chart structure", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "barChart");

    const { html } = BarChartSlide(raw);

    expect(html).toContain("barChart");
    expect(html).toContain("bar-row");
    expect(html).toContain("bar-fill");
  });

  test("returns animation type", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "barChart");

    const { animation } = BarChartSlide(raw);

    expect(animation).toBe("progressiveReveal");
  });

  test("returns ids for all items", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "barChart");

    const { ids } = BarChartSlide(raw);

    expect(ids.length).toBe(raw.data.length);
  });

  test("renders all bars", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "barChart");

    const { html } = BarChartSlide(raw);

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

    const { html } = BarChartSlide(data);

    expect(html).toContain("first");
    expect(html).toContain("second");
  });

  test("all ids are present in html", () => {
    const raw = goldenDeckV2.deck.find(s => s.type === "barChart");

    const { html, ids } = BarChartSlide(raw);

    ids.forEach(id => {
      expect(html).toContain(`id="${id}"`);
    });
  });

});