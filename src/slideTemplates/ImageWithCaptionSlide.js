import { progressiveReveal } from "../helpers/progressiveReveal.js";
import { addIdToItems } from "../helpers/addIdToItems.js";

export function ImageWithCaptionSlide(data) {
  const rawItems = data.data ?? [];

  const items = addIdToItems(rawItems);

  const imgItem = items.find(d => d.name === "image");
  const capItem = items.find(d => d.name === "caption");

  if (!imgItem) {
    throw new Error("imageWithCaption: requires image");
  }

  const allIds = items.map(i => i.id);
  const actions = progressiveReveal(allIds);

  const html = `
    <figure class="slide imageWithCaption">

      <img 
        id="${imgItem.id}" 
        class="hidden ${imgItem.classes || ""}" 
        src="${imgItem.content}" 
      />

      ${
        capItem
          ? `
            <figcaption 
              id="${capItem.id}" 
              class="hidden ${capItem.classes || ""}"
            >
              ${capItem.content}
            </figcaption>
          `
          : ``
      }

    </figure>
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