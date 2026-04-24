import { addIdToItems } from "../helpers/addIdToItems.js";

export function TextGridSlide(data) {
  const rawItems = data.data ?? [];

  const items = addIdToItems(rawItems);

  const texts = items.filter(d => d.name === "text");

  if (!texts.length) {
    throw new Error("textGrid: requires text items");
  }

  const ids = items.map(i => i.id);

  const html = `
    <section class="slide textGrid">

      <div class="text-grid">
        ${texts
          .map(
            t => `
            <div 
              id="${t.id}" 
              class="text-grid-item hidden ${t.classes || ""}"
            >
              ${t.content}
            </div>
          `
          )
          .join("")}
      </div>

    </section>
  `;

  return {
    html,
    animation: "progressiveReveal",
    ids
  };
}