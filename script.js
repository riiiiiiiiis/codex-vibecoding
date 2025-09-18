const flights = [
  {
    flight: "MT101",
    destination: "ALGARVE",
    depart: "06:20",
    status: "BOARDING",
    gate: "GATE A3",
    duration: "7 НОЧЕЙ · ALL INCLUSIVE",
    price: "£175",
    description: "Семейный курорт с песчаными пляжами Албуфейры и бесплатным трансфером от Monster Travel.",
  },
  {
    flight: "MT212",
    destination: "G.CANARIA",
    depart: "07:05",
    status: "FINAL CALL",
    gate: "GATE B1",
    duration: "7 НОЧЕЙ · ALL INCLUSIVE",
    price: "£169",
    description: "Тёплые канарские вечера, бассейн с подогревом и эксклюзивные экскурсии по дюнам Маспаломаса.",
  },
  {
    flight: "MT305",
    destination: "MAJORCA",
    depart: "08:45",
    status: "ON TIME",
    gate: "GATE C5",
    duration: "10 НОЧЕЙ · HALF BOARD",
    price: "£199",
    description: "Пальма-де-Майорка, живая набережная, ночные прогулки и приветственный коктейль в отеле 4★.",
  },
  {
    flight: "MT328",
    destination: "TENERIFE",
    depart: "09:15",
    status: "ON TIME",
    gate: "GATE A8",
    duration: "7 НОЧЕЙ · ALL INCLUSIVE",
    price: "£165",
    description: "Лунный пейзаж Тейде, парк Loro и гарантированное солнце весь отпуск.",
  },
  {
    flight: "MT410",
    destination: "TUNISIA",
    depart: "10:20",
    status: "BOARDING",
    gate: "GATE D2",
    duration: "7 НОЧЕЙ · FULL BOARD",
    price: "£149",
    description: "Хаммамет и Сусс с восточным базаром, уроками танца и частным пляжем.",
  },
  {
    flight: "MT512",
    destination: "F'VENTURA",
    depart: "11:05",
    status: "DELAYED",
    gate: "GATE B6",
    duration: "14 НОЧЕЙ · ALL INCLUSIVE",
    price: "£185",
    description: "Просторные пляжи, серфинг для начинающих и бесплатный детский клуб на две недели.",
  },
  {
    flight: "MT604",
    destination: "LANZAROTE",
    depart: "12:40",
    status: "GO TO GATE",
    gate: "GATE C4",
    duration: "7 НОЧЕЙ · ALL INCLUSIVE",
    price: "£179",
    description: "Вулканические пейзажи Тиманфайи, дегустация местных вин и бассейн с морской водой.",
  },
  {
    flight: "MT720",
    destination: "BENIDORM",
    depart: "13:35",
    status: "ON TIME",
    gate: "GATE A1",
    duration: "7 НОЧЕЙ · ROOM ONLY",
    price: "£139",
    description: "Городские огни Бенидорма, небоскрёбы, пляж Леванте и бесплатный бар на крыше.",
  },
  {
    flight: "MT842",
    destination: "CORFU",
    depart: "14:10",
    status: "NEW GATE",
    gate: "GATE F3",
    duration: "7 НОЧЕЙ · HALF BOARD",
    price: "£159",
    description: "Изумрудные бухты, греческие таверны и экскурсия на лодке к Палеокастрице.",
  },
  {
    flight: "MT915",
    destination: "HURGHADA",
    depart: "15:55",
    status: "ON TIME",
    gate: "GATE E2",
    duration: "7 НОЧЕЙ · ALL INCLUSIVE",
    price: "£209",
    description: "Красное море, дайвинг-сафари, гигантские рифы и аквапарк на территории отеля.",
  },
  {
    flight: "MT990",
    destination: "CYPRUS",
    depart: "16:30",
    status: "BOARDING",
    gate: "GATE D7",
    duration: "14 НОЧЕЙ · HALF BOARD",
    price: "£245",
    description: "Айя-Напа, древний курион и поездка на закат к скале Афродиты.",
  },
  {
    flight: "MT104",
    destination: "CARIBBEAN",
    depart: "18:10",
    status: "ON TIME",
    gate: "GATE H2",
    duration: "10 НОЧЕЙ · ULTRA ALL INCLUSIVE",
    price: "£259",
    description: "Карибские вечера с живой музыкой, катамаран и экскурс по ромовым плантациям.",
  },
];

const boardContainer = document.querySelector('[data-board-list]');
const selectionPanel = document.querySelector('[data-selection-panel]');
const selectionPlaceholder = selectionPanel?.querySelector('[data-selection-placeholder]');
const selectionDetails = selectionPanel?.querySelector('[data-selection-details]');
const selectionDestination = selectionPanel?.querySelector('[data-selection-destination]');
const selectionDuration = selectionPanel?.querySelector('[data-selection-duration]');
const selectionGate = selectionPanel?.querySelector('[data-selection-gate]');
const selectionPrice = selectionPanel?.querySelector('[data-selection-price]');
const selectionDescription = selectionPanel?.querySelector('[data-selection-description]');
const statusTime = document.querySelector('.status-time');
const statusDate = document.querySelector('.status-date');

const visibleRowCount = Math.min(8, flights.length);
const boardRows = [];
let activeRow = null;
let cyclePointer = visibleRowCount % flights.length;
let rotationIndex = 0;

function updateClock() {
  const now = new Date();
  const timeString = now
    .toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    .replace(/\./g, ':');
  if (statusTime) {
    statusTime.textContent = timeString;
  }
  if (statusDate) {
    const month = now
      .toLocaleDateString('en-GB', { month: 'short' })
      .replace('.', '')
      .toUpperCase();
    const day = String(now.getDate()).padStart(2, '0');
    statusDate.textContent = `${month}${day}`;
  }
}

function createBoardCell(initialValue) {
  const cell = document.createElement('span');
  cell.className = 'board-cell';

  const topFace = document.createElement('span');
  topFace.className = 'board-cell-face board-cell-face--upper';

  const bottomFace = document.createElement('span');
  bottomFace.className = 'board-cell-face board-cell-face--lower';

  const flipUpper = document.createElement('span');
  flipUpper.className = 'board-cell-flip board-cell-flip--upper';

  const flipLower = document.createElement('span');
  flipLower.className = 'board-cell-flip board-cell-flip--lower';

  const srOnly = document.createElement('span');
  srOnly.className = 'sr-only board-cell-text';

  cell.append(topFace, bottomFace, flipUpper, flipLower, srOnly);

  function setInstant(value) {
    const displayValue = value || '\u00A0';
    topFace.textContent = displayValue;
    bottomFace.textContent = displayValue;
    srOnly.textContent = displayValue;
    cell.dataset.currentValue = displayValue;
  }

  function setAnimated(value) {
    const nextValue = value || '\u00A0';
    const currentValue = cell.dataset.currentValue;
    if (currentValue === nextValue) {
      return;
    }

    if (cell.classList.contains('is-flipping')) {
      cell.classList.remove('is-flipping');
    }

    bottomFace.textContent = nextValue;
    flipUpper.textContent = currentValue || '\u00A0';
    flipLower.textContent = nextValue;

    void cell.offsetWidth;
    cell.classList.add('is-flipping');

    flipLower.addEventListener(
      'animationend',
      () => {
        cell.classList.remove('is-flipping');
        topFace.textContent = nextValue;
        bottomFace.textContent = nextValue;
        srOnly.textContent = nextValue;
        flipUpper.textContent = '';
        flipLower.textContent = '';
        cell.dataset.currentValue = nextValue;
      },
      { once: true }
    );
  }

  setInstant(initialValue);

  return {
    element: cell,
    setInstant,
    setValue: setAnimated,
  };
}

function createBoardRow(flight) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'table-row board-row';
  button.setAttribute('role', 'listitem');

  const columns = [
    { key: 'flight', className: 'flight' },
    { key: 'destination', className: 'destination' },
    { key: 'depart', className: 'depart' },
    { key: 'status', className: 'status' },
  ];

  const cells = columns.map((column) => {
    const cell = createBoardCell(flight[column.key]);
    cell.element.classList.add('col', column.className);
    button.appendChild(cell.element);
    return cell;
  });

  function updateAriaLabel(data) {
    button.setAttribute(
      'aria-label',
      `${data.flight} → ${data.destination}, вылет ${data.depart}, статус ${data.status}`
    );
  }

  button.addEventListener('click', () => {
    setActiveRow(rowApi);
  });

  const rowApi = {
    button,
    cells,
    flight,
    setFlight(nextFlight, { animate } = { animate: true }) {
      this.flight = nextFlight;
      columns.forEach((column, index) => {
        const value = nextFlight[column.key];
        if (animate) {
          cells[index].setValue(value);
        } else {
          cells[index].setInstant(value);
        }
      });
      updateAriaLabel(nextFlight);
      button.dataset.flight = nextFlight.flight;
      button.dataset.destination = nextFlight.destination;
      button.dataset.price = nextFlight.price;
      button.dataset.status = nextFlight.status
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-');
    },
  };

  rowApi.setFlight(flight, { animate: false });

  return rowApi;
}

function populateBoard() {
  if (!boardContainer) {
    return;
  }

  for (let i = 0; i < visibleRowCount; i += 1) {
    const flight = flights[i % flights.length];
    const row = createBoardRow(flight);
    boardRows.push(row);
    boardContainer.appendChild(row.button);
  }
}

function rotateBoard() {
  if (flights.length <= visibleRowCount) {
    return;
  }

  const rowIndex = rotationIndex % visibleRowCount;
  const nextFlight = flights[cyclePointer % flights.length];
  cyclePointer = (cyclePointer + 1) % flights.length;
  rotationIndex += 1;

  const row = boardRows[rowIndex];
  row.setFlight(nextFlight, { animate: true });

  if (activeRow === row) {
    updateSelectionPanel(nextFlight);
  }
}

function setActiveRow(row) {
  if (activeRow) {
    activeRow.button.classList.remove('is-active');
  }
  activeRow = row;
  activeRow.button.classList.add('is-active');
  updateSelectionPanel(row.flight);
}

function updateSelectionPanel(flight) {
  if (!selectionPanel || !selectionDetails || !selectionPlaceholder) {
    return;
  }

  selectionPlaceholder.hidden = true;
  selectionDetails.hidden = false;

  if (selectionDestination) {
    selectionDestination.textContent = `${flight.destination} · ${flight.flight}`;
  }
  if (selectionDuration) {
    selectionDuration.textContent = flight.duration;
  }
  if (selectionGate) {
    selectionGate.textContent = flight.gate;
  }
  if (selectionPrice) {
    selectionPrice.textContent = flight.price;
  }
  if (selectionDescription) {
    selectionDescription.textContent = flight.description;
  }
}

function autoSelectInitialRow() {
  if (boardRows.length === 0) {
    return;
  }
  setActiveRow(boardRows[0]);
}

updateClock();
setInterval(updateClock, 1000);
populateBoard();
autoSelectInitialRow();

if (flights.length > visibleRowCount) {
  setInterval(rotateBoard, 4000);
}
