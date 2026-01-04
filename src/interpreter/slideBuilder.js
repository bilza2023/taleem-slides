// src/interpreter/slideBuilder.js

import { registry } from "../registry.js";

/**
 * slideBuilder
 *
 * @param {object} deckV1Json - untrusted deck-v1 JSON
 * @returns {Array<Slide>} - array of immutable Slide objects
 *
 * @throws Error on first structural or semantic failure
 */
export function slideBuilder(deckV1Json) {
  // ---- basic structural checks (panic early) ----
  if (!deckV1Json || typeof deckV1Json !== "object") {
    throw new Error("slideBuilder: input must be an object");
  }

  if (deckV1Json.version !== "deck-v1") {
    throw new Error(
      `slideBuilder: unsupported deck version "${deckV1Json.version}"`
    );
  }

  if (!Array.isArray(deckV1Json.deck)) {
    throw new Error("slideBuilder: deck must be an array");
  }

  // ---- interpret slides ----
  const slides = deckV1Json.deck.map((rawSlide, index) => {
    if (!rawSlide || typeof rawSlide !== "object") {
      throw new Error(`slideBuilder: slide ${index} is not an object`);
    }

    const { type } = rawSlide;

    if (!type || typeof type !== "string") {
      throw new Error(`slideBuilder: slide ${index} has no valid type`);
    }

    const builder = registry[type];

    if (!builder) {
      throw new Error(
        `slideBuilder: unsupported slide type "${type}" at index ${index}`
      );
    }

    try {
      return builder.fromJSON(rawSlide, index);
    } catch (err) {
      throw new Error(
        `slideBuilder: failed to build slide "${type}" at index ${index}\n${err.message}`
      );
    }
  });

  // ---- freeze output (immutability guarantee) ----
  slides.forEach(Object.freeze);
  Object.freeze(slides);

  return slides;
}
