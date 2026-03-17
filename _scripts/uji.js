const host = document.querySelector("#FamilyChart");
const dataUrl = document.documentElement.dataset.ujiDataUrl;

if (!host || !dataUrl || window.__ujiInitialized) {
  console.log("uji.js skipped");
} else {
  window.__ujiInitialized = true;

  fetch(dataUrl)
    .then((res) => res.json())
    .then((data) => createChart(host, data))
    .catch((err) => console.error("Failed to load uji data:", err));
}

function createChart(host, data) {
  const shadowRoot = host.shadowRoot || host.attachShadow({ mode: "open" });
  shadowRoot.innerHTML = "";

  const familyChartStyle = document.createElement("link");
  familyChartStyle.rel = "stylesheet";
  familyChartStyle.href =
    "https://unpkg.com/family-chart@0.7.0/dist/styles/family-chart.css";
  shadowRoot.appendChild(familyChartStyle);

  const cardStyle = document.createElement("link");
  cardStyle.rel = "stylesheet";
  cardStyle.href = `${window.location.origin}/_styles/pages/uji/uji-card.css`;
  shadowRoot.appendChild(cardStyle);

  const chartContainer = document.createElement("div");
  chartContainer.id = "ChartRoot";
  chartContainer.style.width = "100%";
  chartContainer.style.height = "100%";
  chartContainer.classList.add("f3");
  shadowRoot.appendChild(chartContainer);

  const store = f3.createStore({
    data,
    node_separation: 300,
    level_separation: 400,
    layout: "tree",
  });

  const getSvgView = () => chartContainer.querySelector("svg .view");
  const getHtmlSvg = () => chartContainer.querySelector("#htmlSvg");
  const getHtmlView = () =>
    chartContainer.querySelector("#htmlSvg .cards_view");

  const svg = f3.createSvg(chartContainer, {
    onZoom: f3.htmlHandlers.onZoomSetup(getSvgView, getHtmlView),
  });

  f3.htmlHandlers.createHtmlSvg(chartContainer);

  store.setOnUpdate((props) => {
    const tree = store.getTree();
    const mergedProps = Object.assign({}, props || {}, {
      cardHtml: getHtmlSvg(),
    });
    f3.view(tree, svg, Card(store), mergedProps);
  });

  store.updateMainId("0");
  store.updateTree();
}

function Card(store) {
  return function (d) {
    this.innerHTML = `
      <div class="uji-card">
        ${getCardInnerImage(d)}
      </div>
    `;

    const card = this.querySelector(".uji-card");
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
  const image = d?.data?.data?.image;
  const safeImage =
    image && image !== "undefined" && image !== "null"
      ? image
      : "/images/background.webp";

  return `
    <div class="uji-card-image ${getClassList(d).join(" ")}">
      <img src="${safeImage}" alt="${d.data.data.fn || ""} ${d.data.data.ln || ""}" />
      <div class="uji-card-label">${d.data.id !== "0" ? `#${d.data.id} ` : ""}${d.data.data.label || ""}</div>
    </div>
  `;
}

function getClassList(d) {
  const classList = [];
  if (d.data.main) classList.push("uji-card-main");
  return classList;
}