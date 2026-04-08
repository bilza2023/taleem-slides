
import { extractTimeline } from "../renders/extractTimeline.js";
import { buildSequentialStates } from "../renders/buildSequentialStates.js";
import { addIdToItems } from "../helpers/addIdToItems.js";


export function ImageGridSlide(data) {

  const rawItems = data.data ?? [];
  const items = addIdToItems(rawItems);
  const images = items.filter(d => d.name === "image");

  if (!images.length) {
    throw new Error("imageGrid: requires at least one image");
  }

  const allIds = items.map(i => i.id);
  const timeline = extractTimeline(items);
  const actions = buildSequentialStates(timeline, allIds);

  const html = `
    <section class="slide imageGrid">

      <div class="image-grid ">
        ${images
          .map(
            img => `
            <div class="image-grid-item">
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