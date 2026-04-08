// ImageWithTitleSlide

import { extractTimeline } from "../renders/extractTimeline.js";
import { buildSequentialStates } from "../renders/buildSequentialStates.js";
import { addIdToItems } from "../helpers/addIdToItems.js";

export function ImageWithTitleSlide(data) {
  const rawItems = data.data ?? [];

  const items = addIdToItems(rawItems);

  const titleItem = items.find(d => d.name === "title");
  const imgItem = items.find(d => d.name === "image");

  if (!imgItem) {
    throw new Error("imageWithTitle: requires image");
  }

  const allIds = items.map(i => i.id);
  const timeline = extractTimeline(items);
  const actions = buildSequentialStates(timeline, allIds);

  const html = `
    <section class="slide imageWithTitle">

      ${
        titleItem
          ? `
            <h1 
              id="${titleItem.id}" 
              class="hidden ${titleItem.classes || ""}"
            >
              ${titleItem.content}
            </h1>
          `
          : ``
      }

      <img 
        id="${imgItem.id}" 
        class="hidden ${imgItem.classes || ""}" 
        src="${imgItem.content}" 
      />

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