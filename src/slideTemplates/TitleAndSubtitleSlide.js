import { extractTimeline } from "../renders/extractTimeline.js";
import { buildSequentialStates } from "../renders/buildSequentialStates.js";
import { addIdToItems } from "../helpers/addIdToItems.js";

export function TitleAndSubtitleSlide(data) {
  const rawItems = data.data ?? [];

  if (!rawItems.length) {
    throw new Error("titleAndSubtitle: requires at least a title");
  }

  // 🔹 1. attach ids
  const items = addIdToItems(rawItems);

  // 🔹 2. pick items
  const titleItem = items.find(d => d.name === "title");
  const subtitleItem = items.find(d => d.name === "subtitle");

  if (!titleItem) {
    throw new Error("titleAndSubtitle: requires title");
  }

  // 🔹 3. behavior input (same items, no rebuild)
  const allIds = items.map(i => i.id);

  const timeline = extractTimeline(items);

  const actions = buildSequentialStates(timeline, allIds);

  // 🔹 4. HTML
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
//  console.log("{ html, actions }" ,{ html, actions });
  return { html, actions,
    groups : {
    visible: [],
    hidden: ["hidden"]
  } };
}