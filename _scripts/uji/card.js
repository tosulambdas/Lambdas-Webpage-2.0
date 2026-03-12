export function cardRenderer(store) {
  return function (d) {
    this.innerHTML = `
      <div class="card">
        ${getCardInnerImage(d)}
      </div>
    `;

    const card = this.querySelector(".card");
    if (card) {
      card.addEventListener("click", (e) => {
        e.stopPropagation();
        store.updateMainId(d.data.id);
        store.updateTree();
      });
    }
  };
}

function getCardInnerImage(d) {
  return `
    <div class="card-image ${getClassList(d).join(" ")}">
      <img
        src="${d.data.data.image || ""}"
        alt="${d.data.data.fn || ""} ${d.data.data.ln || ""}" />
      <div class="card-label">
        ${d.data.id !== "0" ? `#${d.data.id} ` : ""}${d.data.data.label || ""}
      </div>
    </div>
  `;
}

function getClassList(d) {
  const classList = [];
  if (d.data.main) classList.push("card-main");
  return classList;
}