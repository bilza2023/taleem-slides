import { progressiveReveal } from "../helpers/progressiveReveal.js";
import { addIdToItems } from "../helpers/addIdToItems.js";

export function TitleAndSubtitleSlide(data) {
  const rawItems = data.data ?? [];

  if (!rawItems.length) {
    throw new Error("titleAndSubtitle: requires at least a title");
  }

  const items = addIdToItems(rawItems);

  const titleItem = items.find(d => d.name === "title");
  const subtitleItem = items.find(d => d.name === "subtitle");

  if (!titleItem) {
    throw new Error("titleAndSubtitle: requires title");
  }

  const allIds = items.map(i => i.id);
  const actions = progressiveReveal(allIds);

  const html = `
    <section class="slide titleAndSubtitle">

      <h1 
        id="${titleItem.id}" 
        class="hidden taleem-heading-lg ${titleItem.classes || ""}"
      >
        ${titleItem.content}
      </h1>

      ${
        subtitleItem
          ? `
            <h2 
              id="${subtitleItem.id}" 
              class="hidden taleem-heading-md ${subtitleItem.classes || ""}"
            >
              ${subtitleItem.content}
            </h2>
          `
          : ``
      }

    </section>
  `;

  return {
    html,
    actions,
    groups: {
      visible: [],
      hidden: ["hidden"]
    }
  };
}