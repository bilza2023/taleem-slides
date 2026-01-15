
// TitleSlide.js
export const TitleSlide = {
  type: "titleSlide",

  fromJSON(raw) {
    const rows = raw.data;
  
    if (!Array.isArray(rows) || rows.length < 2) {
      throw new Error("table: requires header + at least one row");
    }
  
    const [header, ...body] = rows;
  
    return {
      type: "table",
      header,
      rows: body,
      render() {
        return `
          <table class="slide table">
            <thead>
              <tr>${header.map(h => `<th>${h}</th>`).join("")}</tr>
            </thead>
            <tbody>
              ${body.map(r =>
                `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`
              ).join("")}
            </tbody>
          </table>
        `;
      }
    };
  }
  
};
