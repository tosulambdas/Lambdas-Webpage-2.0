fetch('/ujis/data.json')
  .then((res) => res.json())
  .then((data) => createUjiChart(data))
  .catch((err) => console.error('Failed to load uji data:', err));

function createUjiChart(data) {
  const host = document.querySelector('#FamilyChart');
  if (!host) return;

  const shadowRoot = host.attachShadow({ mode: 'open' });

  const styleLink = document.createElement('link');
  styleLink.rel = 'stylesheet';
  styleLink.href =
    'https://unpkg.com/family-chart@0.7.0/dist/styles/family-chart.css';
  shadowRoot.appendChild(styleLink);

  const extraStyle = document.createElement('style');
  extraStyle.textContent = `
    .card {
      pointer-events: auto;
      transform: translate(-40%, -50%);
      cursor: pointer;
      color: #fff;
      position: relative;
      width: 20rem;
      height: 20rem;
      overflow: visible;
      background: transparent;
      box-shadow: none;
    }

    .card-image {
      background: transparent;
      border-radius: 50%;
      margin-top: 10px;
      padding: 10px;
      width: 16rem;
      height: 16rem;
      aspect-ratio: 1 / 1;
      overflow: visible;
    }

    .card-label {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translate(-65%, -20%);
      text-align: center;
      background-color: rgba(0, 0, 0, 0.5);
      white-space: nowrap;
      border-radius: 3px;
      padding: 0 5px;
      font-size: 2rem;
    }

    .card-image img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }

    .card > div {
      transition: transform 0.2s ease-in-out;
    }
  `;
  shadowRoot.appendChild(extraStyle);

  const chartContainer = document.createElement('div');
  chartContainer.id = 'ChartRoot';
  chartContainer.style.width = '100%';
  chartContainer.style.height = '100%';
  chartContainer.classList.add('f3');
  shadowRoot.appendChild(chartContainer);

  const store = f3.createStore({
    data,
    node_separation: 300,
    level_separation: 400,
    layout: 'tree',
  });

  const getSvgView = () => chartContainer.querySelector('svg .view');
  const getHtmlSvg = () => chartContainer.querySelector('#htmlSvg');
  const getHtmlView = () =>
    chartContainer.querySelector('#htmlSvg .cards_view');

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

  store.updateMainId('0');
  store.updateTree();
}

function Card(store) {
  return function (d) {
    this.innerHTML = `
      <div class="card">
        ${getCardInnerImage(d)}
      </div>
    `;

    const card = this.querySelector('.card');
    if (card) {
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        store.updateMainId(d.data.id);
        store.updateTree();
      });
    }
  };
}

function getCardInnerImage(d) {
  return `
    <div class="card-image ${getClassList(d).join(' ')}">
      <img src="${d.data.data.image}" alt="${d.data.data.fn || ''} ${d.data.data.ln || ''}" />
      <div class="card-label">
        ${d.data.id !== '0' ? `#${d.data.id} ` : ''}${d.data.data.label || ''}
      </div>
    </div>
  `;
}

function getClassList(d) {
  const classList = [];
  if (d.data.main) classList.push('card-main');
  return classList;
}