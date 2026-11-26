const API_URL = window.API_URL || 'http://localhost:3000/data-hora';

const statusElement = document.getElementById('status');
const consultarButton = document.getElementById('consultar');
const clockGrid = document.getElementById('clock-grid');

let referenceInstant;
let referenceTick;
let clockInterval;
let clocks = [];

function setStatus(message, isError = false) {
  statusElement.textContent = message;
  statusElement.classList.toggle('is-error', isError);
  statusElement.parentElement.classList.toggle('has-error', isError);
}

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function createClockCard(localTime, index) {
  if (
    !localTime ||
    !localTime.cidade ||
    !localTime.pais ||
    !localTime.fusoHorario ||
    !localTime.data ||
    !localTime.hora
  ) {
    throw new Error('A API retornou um horário com campos incompletos.');
  }

  const card = document.createElement('article');
  card.className = index === 0 ? 'clock-card clock-card--featured' : 'clock-card';
  card.dataset.timezone = localTime.fusoHorario;

  const cityHeading = document.createElement('div');
  cityHeading.className = 'city-heading';

  const cityDot = document.createElement('span');
  cityDot.className = 'city-dot';
  cityDot.setAttribute('aria-hidden', 'true');

  cityHeading.append(
    cityDot,
    createTextElement('span', 'city-country', localTime.pais),
  );

  const city = createTextElement('h3', '', localTime.cidade);
  const time = createTextElement('p', 'clock-time', localTime.hora);
  const date = createTextElement('p', 'clock-date', localTime.data);
  const timezone = createTextElement('span', 'timezone-label', localTime.fusoHorario);

  card.append(cityHeading, city, time, date, timezone);

  return {
    card,
    timezone: localTime.fusoHorario,
    timeElement: time,
    dateElement: date,
    timeFormatter: new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
      timeZone: localTime.fusoHorario,
    }),
    dateFormatter: new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: localTime.fusoHorario,
    }),
  };
}

function renderClocks() {
  if (referenceInstant === undefined) {
    return;
  }

  const elapsedMilliseconds = performance.now() - referenceTick;
  const currentInstant = new Date(referenceInstant + elapsedMilliseconds);

  clocks.forEach(({ timeElement, dateElement, timeFormatter, dateFormatter }) => {
    timeElement.textContent = timeFormatter.format(currentInstant);
    dateElement.textContent = dateFormatter.format(currentInstant);
  });
}

async function consultarDataHora() {
  consultarButton.disabled = true;
  consultarButton.classList.add('is-loading');
  setStatus('Sincronizando os relógios...');

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`A API respondeu com o status ${response.status}.`);
    }

    const dados = await response.json();
    const timestamp = Date.parse(dados.dataHora);

    if (!dados.dataHora || !Number.isFinite(timestamp)) {
      throw new Error('A resposta da API não contém dataHora em formato ISO válido.');
    }
    if (!Array.isArray(dados.horarios) || dados.horarios.length === 0) {
      throw new Error('A resposta da API não contém uma lista de horários.');
    }

    clocks = dados.horarios.map(createClockCard);
    clockGrid.replaceChildren(...clocks.map(({ card }) => card));

    referenceInstant = timestamp;
    referenceTick = performance.now();

    if (clockInterval) {
      window.clearInterval(clockInterval);
    }
    clockInterval = window.setInterval(renderClocks, 1000);

    setStatus(`${clocks.length} horários sincronizados com a API.`);
  } catch (error) {
    setStatus('Não foi possível sincronizar. Verifique a conexão com a API e tente novamente.', true);
    console.error('Erro ao consultar a API de data e hora:', error);
  } finally {
    consultarButton.disabled = false;
    consultarButton.classList.remove('is-loading');
  }
}

consultarButton.addEventListener('click', consultarDataHora);
consultarDataHora();
