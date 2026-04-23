import { progressiveReveal } from "../helpers/progressiveReveal.js";
import { addIdToItems } from "../helpers/addIdToItems.js";

export function ImageSlide(data) {
  const rawItems = data.data ?? [];

  const items = addIdToItems(rawItems);

  const imageItem = items.find(d => d.name === "image");

  if (!imageItem) {
    throw new Error("imageSlide: requires image");
  }

  const allIds = items.map(i => i.id);
  const actions = progressiveReveal(allIds);

  const html = `
    <section class="slide imageSlide">

      <img 
        id="${imageItem.id}" 
        class="hidden ${imageItem.classes || ""}" 
        src="${imageItem.content}" 
        alt="" 
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