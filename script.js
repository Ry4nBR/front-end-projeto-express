const API_URL = 'http://localhost:3000/data-hora';

const dataElement = document.getElementById('data');
const horaElement = document.getElementById('hora');
const statusElement = document.getElementById('status');
const consultarButton = document.getElementById('consultar');

function setStatus(message, isError = false) {
  statusElement.textContent = message;
  statusElement.classList.toggle('error', isError);
}

async function consultarDataHora() {
  setStatus('Carregando data e hora...');

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Resposta inválida: ${response.status}`);
    }

    const dados = await response.json();

    dataElement.textContent = dados.data || '--';
    horaElement.textContent = dados.hora || '--';
    setStatus('Dados carregados com sucesso.');
  } catch (error) {
    dataElement.textContent = '--';
    horaElement.textContent = '--';
    setStatus('Não foi possível consultar a API. Verifique a URL do serviço e a disponibilidade do backend.', true);
    console.error('Erro ao buscar dados da API:', error);
  }
}

consultarButton.addEventListener('click', consultarDataHora);

document.addEventListener('DOMContentLoaded', consultarDataHora);
