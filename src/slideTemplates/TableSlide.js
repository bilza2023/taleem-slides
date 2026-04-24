import { addIdToItems } from "../helpers/addIdToItems.js";

export function TableSlide(data) {
  const rawItems = data.data ?? [];

  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw new Error("table: requires rows");
  }

  const items = addIdToItems(rawItems);

  const rows = items.filter(d => d.name === "row");

  if (!rows.length) {
    throw new Error("table: requires row items");
  }

  const ids = items.map(i => i.id);

  const html = `
    <section class="slide table">

      <table>
        <tbody>
          ${rows
            .map(row => {
              const cells = row.content.split(",").map(s => s.trim());

              return `
                <tr id="${row.id}" class="hidden ${row.classes || ""}">
                  ${cells.map(cell => `<td>${cell}</td>`).join("")}
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>

    </section>
  `;

  return {
    html,
    animation: "progressiveReveal",
    ids
  };
}