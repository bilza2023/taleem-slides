
import { addIdToItems } from "../helpers/addIdToItems.js";

export function KeyIdeasSlide(data) {
  const rawItems = data.data ?? [];
  const items = addIdToItems(rawItems);

  const cards = items.filter(d => d.name === "card");

  if (!cards.length) {
    throw new Error("keyIdeasSlide: requires cards");
  }

  const ids = items.map(i => i.id);

  const html = `
    <section class="slide keyIdeasSlide">

      ${cards
        .map(
          c => `
        <div id="${c.id}" class="key-idea hidden ${c.classes || ""}">
          <div class="icon">${c.icon ?? ""}</div>
          <div class="label">${c.label}</div>
        </div>
      `
        )
        .join("")}

    </section>
  `;

  return {
    html,
    animation: "progressiveReveal",
    ids
  };
}