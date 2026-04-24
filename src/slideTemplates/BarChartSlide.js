import { addIdToItems } from "../helpers/addIdToItems.js";

export function BarChartSlide(data) {
  const rawItems = data.data ?? [];

  const items = addIdToItems(rawItems);

  const bars = items.filter(d => d.name === "bar");

  if (bars.length === 0) {
    return {
      html: `<section class="slide barChart"></section>`,
      animation: "progressiveReveal",
      ids: []
    };
  }

  const ids = items.map(i => i.id);

  const barsData = bars.map(d => ({
    id: d.id,
    label: d.label,
    value: Number(d.value),
    classes: d.classes || ""
  }));

  const maxValue = Math.max(...barsData.map(b => b.value));

  const html = `
    <section class="slide barChart">

      <div class="bar-chart">
        
        ${barsData
          .map(bar => {
            const width = maxValue > 0 ? (bar.value / maxValue) * 100 : 0;

            return `
              <div id="${bar.id}" class="bar-row hidden ${bar.classes}">
                
                <div class="bar-label">${bar.label}</div>

                <div class="bar-track">
                  <div class="bar-fill" style="width: ${width}%"></div>
                </div>

                <div class="bar-value">${bar.value}</div>

              </div>
            `;
          })
          .join("")}

      </div>

    </section>
  `;

  return {
    html,
    animation: "progressiveReveal",
    ids
  };
}