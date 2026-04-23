import { describe, test, expect } from "vitest";
import { progressiveReveal } from "../src/helpers/progressiveReveal.js";

describe("progressiveReveal (pure)", () => {

  test("reveals items one by one", () => {
    const ids = ["a", "b", "c"];

    const actions = progressiveReveal(ids);

    expect(actions).toEqual([
      {
        time: 0,
        state: { hidden: ["b", "c"] }
      },
      {
        time: 1,
        state: { hidden: ["c"] }
      },
      {
        time: 2,
        state: { hidden: [] }
      }
    ]);
  });

});