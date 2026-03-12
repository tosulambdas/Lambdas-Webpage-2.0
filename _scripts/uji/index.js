import { createUjiChart } from "./chart.js";

const host = document.querySelector("#FamilyChart");

if (host) {
  createUjiChart({
    host,
    dataUrl: host.dataset.url
  });
}