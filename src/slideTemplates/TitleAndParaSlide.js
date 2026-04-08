import { extractTimeline } from "../renders/extractTimeline.js";
import { buildSequentialStates } from "../renders/buildSequentialStates.js";
import { addIdToItems } from "../helpers/addIdToItems.js";

export function TitleAndParaSlide(data) {
  const rawItems = data.data ?? [];

  if (!rawItems.length) {
    throw new Error("titleAndPara: requires data");
  }

  const items = addIdToItems(rawItems);

  const titleItem = items.find(d => d.name === "title");
  const paraItem = items.find(d => d.name === "para");

  if (!paraItem) {
    throw new Error("titleAndPara: requires para");
  }

  const allIds = items.map(i => i.id);
  const timeline = extractTimeline(items);
  const actions = buildSequentialStates(timeline, allIds);

  const html = `
    <section class="slide titleAndPara">

      ${
        titleItem
          ? `
            <h1 
              id="${titleItem.id}" 
              class="hidden taleem-heading-md "
            >
              ${titleItem.content}
            </h1>
          `
          : ``
      }

      <p 
        id="${paraItem.id}" 
        class="hidden taleem-para "
      >
        ${paraItem.content}
      </p>

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