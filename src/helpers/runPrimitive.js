// src/core/primitives/runPrimitive.js

import { progressiveReveal } from "./progressiveReveal.js";
import { showAllHighlightOne } from "./showAllHighlightOne.js";
import { showOneAtATime } from "./showOneAtATime.js";

export function runPrimitive({ type, ids, timings }) {
  switch (type) {
    case "progressiveReveal":
      return {
        actions: progressiveReveal(ids, timings),
        groups: {
          visible: [],
          hidden: ["hidden"]
        }
      };

    case "highlightOne":
      return {
        actions: showAllHighlightOne(ids, timings),
        groups: {
          focus: [],
          dim: ["dim"]
        }
      };

    case "oneAtATime":
      return {
        actions: showOneAtATime(ids, timings),
        groups: {
          visible: [],
          hidden: ["hidden"]
        }
      };

    default:
      throw new Error(`Unknown primitive: ${type}`);
  }
}