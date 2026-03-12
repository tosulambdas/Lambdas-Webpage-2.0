import { cardRenderer } from "./card.js";
import { chartStyles } from "./styles.js";

export async function createUjiChart({ host, dataUrl }) {
  if (!host) return;

  try {
    const response = await fetch(dataUrl);
    const data = await response.json();

    const shadowRoot = host.attachShadow({ mode: "open" });

    attachStyles(shadowRoot);

    const chartContainer = document.createElement("div");
    chartContainer.id = "ChartRoot";
    chartContainer.classList.add("f3");
    chartContainer.style.width = "100%";
    chartContainer.style.height = "100%";
    shadowRoot.appendChild(chartContainer);

    const store = f3.createStore({
      data,
      node_separation: 300,
      level_separation: 400,
      layout: "tree"
    });

    const getSvgView = () => chartContainer.querySelector("svg .view");
    const getHtmlSvg = () => chartContainer.querySelector("#htmlSvg");
    const getHtmlView = () => chartContainer.querySelector("#htmlSvg .cards_view");

    const svg = f3.createSvg(chartContainer, {
      onZoom: f3.htmlHandlers.onZoomSetup(getSvgView, getHtmlView)
    });

    f3.htmlHandlers.createHtmlSvg(chartContainer);

    store.setOnUpdate((props) => {
      const tree = store.getTree();
      const mergedProps = Object.assign({}, props || {}, {
        cardHtml: getHtmlSvg()
      });

      f3.view(tree, svg, cardRenderer(store), mergedProps);
    });

    store.updateMainId("0");
    store.updateTree();
  } catch (error) {
    console.error("Failed to load uji data:", error);
  }
}

function attachStyles(shadowRoot) {
  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href = "https://unpkg.com/family-chart@0.7.0/dist/styles/family-chart.css";
  shadowRoot.appendChild(styleLink);

  const extraStyle = document.createElement("style");
  extraStyle.textContent = chartStyles;
  shadowRoot.appendChild(extraStyle);
}