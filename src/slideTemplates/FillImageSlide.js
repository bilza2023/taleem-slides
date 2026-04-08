import { extractTimeline } from "../renders/extractTimeline.js";
import { buildSequentialStates } from "../renders/buildSequentialStates.js";
import { addIdToItems } from "../helpers/addIdToItems.js";

export function FillImageSlide(data) {
  const rawItems = data.data ?? [];

  const items = addIdToItems(rawItems);

  const imageItem = items.find(d => d.name === "image");

  if (!imageItem?.content) {
    throw new Error("fillImage: image required");
  }

  const allIds = items.map(i => i.id);
  const timeline = extractTimeline(items);
  const actions = buildSequentialStates(timeline, allIds);

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
    actions,
    groups: {
      visible: [],
      hidden: ["hidden"]
    }
  };
}