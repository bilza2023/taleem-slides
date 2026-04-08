import { extractTimeline } from "../renders/extractTimeline.js";
import { buildSequentialStates } from "../renders/buildSequentialStates.js";
import { addIdToItems } from "../helpers/addIdToItems.js";

export function ImageStripSlide(data) {
  const rawItems = data.data ?? [];

  const items = addIdToItems(rawItems);

  const images = items.filter(d => d.name === "image");

  if (images.length === 0) {
    throw new Error("imageStrip: requires at least one image");
  }

  const allIds = items.map(i => i.id);
  const timeline = extractTimeline(items);
  const actions = buildSequentialStates(timeline, allIds);

  const html = `
    <section class="slide imageStrip">

      <div class="image-strip">
        ${images
          .map(
            img => `
            <div class="image-strip-item">
              <img 
                id="${img.id}" 
                class="hidden ${img.classes || ""}" 
                src="${img.content}" 
              />
            </div>
          `
          )
          .join("")}
      </div>

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