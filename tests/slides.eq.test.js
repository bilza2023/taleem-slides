import { describe, test, expect } from "vitest";
import { EqSlide } from "../src/slides/EqSlide.js";

describe("EqSlide (v1 bounded)", () => {
  const rawEqSlide = {
    type: "eq",
    start: 90,
    end: 95,
    data: [
      {
        name: "line",
        content: "First line",
        showAt: 90
      },
      {
        name: "line",
        content: "Second line",
        showAt: 91,
        spItems: [
          { type: "spText", content: "Sidebar for second line" }
        ]
      },
      {
        name: "line",
        content: "Third line",
        showAt: 92
      },
      {
        name: "line",
        content: "Fourth line",
        showAt: 93
      },
      {
        name: "line",
        content: "Fifth line",
        showAt: 94
      }
    ]
  };

  test("creates eq slide from JSON", () => {
    const slide = EqSlide.fromJSON(rawEqSlide);

    expect(slide.type).toBe("eq");
    expect(slide.lines.length).toBe(5);
    expect(slide.lines[1].content).toBe("Second line");
  });

  test("renders base eq layout", () => {
    const slide = EqSlide.fromJSON(rawEqSlide);
    const html = slide.render();

    expect(html).toContain('class="slide eq"');
    expect(html).toContain('class="eq-layout"');
    expect(html).toContain('class="eq-left"');
    expect(html).toContain('class="eq-right"');
  });

  test("respects visibleCount (time-based reveal)", () => {
    const slide = EqSlide.fromJSON(rawEqSlide);
    const html = slide.render({ visibleCount: 2 });

    expect(html).toContain("First line");
    expect(html).toContain("Second line");
    expect(html).not.toContain("Third line");
  });

  test("highlights active line", () => {
    const slide = EqSlide.fromJSON(rawEqSlide);
    const html = slide.render({
      visibleCount: 2,
      activeIndex: 1
    });

    expect(html).toContain("eq-line is-active");
    expect(html).toContain("Second line");
  });

  test("renders sidebar content from spItems of active line", () => {
    const slide = EqSlide.fromJSON(rawEqSlide);
    const html = slide.render({
      visibleCount: 2,
      activeIndex: 1
    });

    expect(html).toContain("Sidebar for second line");
  });

  test("drops old lines when window size exceeded", () => {
    const slide = EqSlide.fromJSON(rawEqSlide);

    // WINDOW_SIZE = 4, visibleCount = 5
    const html = slide.render({
      visibleCount: 5,
      activeIndex: 4
    });

    // First line should be dropped
    expect(html).not.toContain("First line");

    // Last four should exist
    expect(html).toContain("Second line");
    expect(html).toContain("Third line");
    expect(html).toContain("Fourth line");
    expect(html).toContain("Fifth line");
  });

  test("throws error when no eq lines exist", () => {
    expect(() =>
      EqSlide.fromJSON({
        type: "eq",
        data: []
      })
    ).toThrow("eq: requires at least one line");
  });
});
