import { addIdToItems } from "../helpers/addIdToItems.js";

export function FillImageSlide(data) {
  const rawItems = data.data ?? [];

  const items = addIdToItems(rawItems);

  const imageItem = items.find(d => d.name === "image");

  if (!imageItem?.content) {
    throw new Error("fillImage: image required");
  }

  const ids = items.map(i => i.id);

  const html = `
    <section class="slide fillImage">

      <img 
        id="${imageItem.id}" 
        class="hidden ${imageItem.classes || ""}" 
        src="${imageItem.content}" 
      />

    </section>
  `;

  return {
    html,
    animation: "progressiveReveal",
    ids
  };
}