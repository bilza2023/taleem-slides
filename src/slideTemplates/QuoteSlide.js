import { extractTimeline } from "../renders/extractTimeline.js";
import { buildSequentialStates } from "../renders/buildSequentialStates.js";
import { addIdToItems } from "../helpers/addIdToItems.js";

export function QuoteSlide(data) {
  const rawItems = data.data ?? [];

  const items = addIdToItems(rawItems);

  const quoteItem = items.find(d => d.name === "quote");
  const authorItem = items.find(d => d.name === "author");

  if (!quoteItem) {
    throw new Error("quoteSlide: requires quote");
  }

  const allIds = items.map(i => i.id);
  const timeline = extractTimeline(items);
  const actions = buildSequentialStates(timeline, allIds);

  const html = `
    <blockquote class="slide quoteSlide">

      <p 
        id="${quoteItem.id}" 
        class="hidden ${quoteItem.classes || ""}"
      >
        ${quoteItem.content}
      </p>

      ${
        authorItem
          ? `
            <footer 
              id="${authorItem.id}" 
              class="hidden ${authorItem.classes || ""}"
            >
              ${authorItem.content}
            </footer>
          `
          : ``
      }

    </blockquote>
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