import { addIdToItems } from "../helpers/addIdToItems.js";

export function ImageRightBulletsLeftSlide(data) {
  const rawItems = data.data ?? [];

  const items = addIdToItems(rawItems);

  const imgItem = items.find(d => d.name === "image");
  const bullets = items.filter(d => d.name === "bullet");

  if (!imgItem || bullets.length === 0) {
    throw new Error("imageRightBulletsLeft: requires image and bullets");
  }

  const ids = items.map(i => i.id);

  const html = `
    <section class="slide imageRightBulletsLeft">

      <ul>
        ${bullets
          .map(
            b => `
            <li 
              id="${b.id}" 
              class="hidden ${b.classes || ""}"
            >
              ${b.content}
            </li>
          `
          )
          .join("")}
      </ul>

      <img 
        id="${imgItem.id}" 
        class="hidden ${imgItem.classes || ""}" 
        src="${imgItem.content}" 
      />

    </section>
  `;

  return {
    html,
    animation: "progressiveReveal",
    ids
  };
}