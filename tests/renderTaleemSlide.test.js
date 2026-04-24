import { describe, test, expect } from "vitest";
import { renderTaleemSlide } from "../src/renderTaleemSlide.js";
import { SlideRegistry } from "../src/registry/registry.js";

describe("renderTaleemSlide (framework)", () => {

  test("generates actions + groups (progressiveReveal)", () => {
    SlideRegistry.testSlide = () => ({
      html: "<div><p id='a'></p><p id='b'></p><p id='c'></p></div>",
      animation: "progressiveReveal",
      ids: ["a", "b", "c"]
    });

    const result = renderTaleemSlide({ type: "testSlide" });

    expect(result.html).toContain("<div>");

    expect(result.groups).toEqual({
      visible: [],
      hidden: ["hidden"]
    });

    expect(result.actions).toEqual([
      { time: 0, state: { hidden: ["b", "c"] } },
      { time: 1, state: { hidden: ["c"] } },
      { time: 2, state: { hidden: [] } }
    ]);
  });

  test("throws if timings are not strictly increasing", () => {
    SlideRegistry.testSlide = () => ({
      html: "<div></div>",
      animation: "progressiveReveal",
      ids: ["a", "b", "c"]
    });

    expect(() =>
      renderTaleemSlide({
        type: "testSlide",
        timings: [1, 1, 2]
      })
    ).toThrow("timings must be strictly increasing");
  });

  test("throws if timings length does not match ids", () => {
    SlideRegistry.testSlide = () => ({
      html: "<div></div>",
      animation: "progressiveReveal",
      ids: ["a", "b", "c"]
    });

    expect(() =>
      renderTaleemSlide({
        type: "testSlide",
        timings: [1, 2]
      })
    ).toThrow("timings length must match ids length");
  });

  test("throws for unknown slide type", () => {
    expect(() =>
      renderTaleemSlide({ type: "doesNotExist" })
    ).toThrow("Unknown slide type");
  });

  test("throws if slide does not return ids", () => {
    SlideRegistry.badSlide = () => ({
      html: "<div></div>",
      animation: "progressiveReveal"
    });

    expect(() =>
      renderTaleemSlide({ type: "badSlide" })
    ).toThrow("Slide must return ids");
  });

});