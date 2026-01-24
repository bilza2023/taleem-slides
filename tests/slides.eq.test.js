import { describe, test, expect } from "vitest";
import { EqSlide } from "../src/slides/EqSlide.js";

describe("EqSlide", () => {
  const rawEqSlide = {
    type: "eq",
    start: 90,
    end: 95,
    data: [
      {
        name: "line",
        type: "heading",
        content: "Eq Slide - under construction",
        showAt: 90
      },
      {
        name: "line",
        type: "math",
        content: "render(data) ⇒ same output",
        showAt: 91
      }
    ]
  };

  test("creates eq slide from JSON", () => {
    const slide = EqSlide.fromJSON(rawEqSlide);

    expect(slide.type).toBe("eq");
    expect(slide.lines.length).toBe(2);
    expect(slide.lines[0].content).toBe("Eq Slide - under construction");
    expect(slide.lines[1].content).toBe("render(data) ⇒ same output");
  });

  test("renders eq layout with left and right panels", () => {
    const slide = EqSlide.fromJSON(rawEqSlide);
    const html = slide.render();

    expect(html).toContain('class="slide eq"');
    expect(html).toContain('class="eq-layout"');
    expect(html).toContain('class="eq-left"');
    expect(html).toContain('class="eq-right"');
  });

  test("renders all lines inside left panel only", () => {
    const slide = EqSlide.fromJSON(rawEqSlide);
    const html = slide.render();

    const leftIndex = html.indexOf("eq-left");
    const rightIndex = html.indexOf("eq-right");

    expect(leftIndex).toBeGreaterThan(-1);
    expect(rightIndex).toBeGreaterThan(leftIndex);

    expect(html).toContain("Eq Slide - under construction");
    expect(html).toContain("render(data) ⇒ same output");
  });

  test("respects visibleCount", () => {
    const slide = EqSlide.fromJSON(rawEqSlide);
    const html = slide.render({ visibleCount: 1 });

    expect(html).toContain("Eq Slide - under construction");
    expect(html).not.toContain("render(data) ⇒ same output");
  });

  test("throws error when no lines exist", () => {
    expect(() =>
      EqSlide.fromJSON({
        type: "eq",
        data: []
      })
    ).toThrow("eq: requires at least one line");
  });
});
