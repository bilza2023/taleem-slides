// src/core/renderTaleemSlide.js

import { SlideRegistry } from "./registry/registry.js";
import { runPrimitive } from "./helpers/runPrimitive.js";

export function renderTaleemSlide(json) {
  const fn = SlideRegistry[json.type];

  if (!fn) {
    throw new Error(`Unknown slide type: ${json.type}`);
  }

  // 🔹 slide is pure → returns structure only
  const { html, animation, ids } = fn(json);

  if (!ids || ids.length === 0) {
    throw new Error(`Slide must return ids`);
  }

  // 🔹 optional timing validation
  if (json.timings) {
    if (json.timings.length !== ids.length) {
      throw new Error(`timings length must match ids length`);
    }

    for (let i = 1; i < json.timings.length; i++) {
      if (json.timings[i] <= json.timings[i - 1]) {
        throw new Error(`timings must be strictly increasing`);
      }
    }
  }

  // 🔹 generate behavior from primitive
  const { actions, groups } = runPrimitive({
    type: animation,
    ids,
    timings: json.timings
  });

  return { html, actions, groups };
}