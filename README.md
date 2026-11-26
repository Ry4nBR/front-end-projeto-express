# Front-end para consumir API -- Aula 04, Atividade 2.2

Front-end simples para consumir a API de data e hora da aula 04, atividade 2.2.
É uma parte da atividade do projeto-express

## Como executar localmente

1. Inicie a API localmente em outro terminal:
   - `npm start` no repositório da API
2. Inicie o front-end:
   ```bash
   python -m http.server 3001
   ```
3. Acesse:
   - http://localhost:3001/

## Configuração da API

O arquivo `index.html` usa a URL do Render por padrão. Para testar com a API local,
troque o valor de `window.API_URL` no `index.html` por:

```js
window.API_URL = 'http://localhost:3000/data-hora';
```

Para executar localmente, inicie a API na porta 3000 antes de abrir o front-end. A URL do Render já está configurada como padrão no `index.html`; se ela mudar, atualize `window.API_URL` antes de carregar `script.js`:

```html
<script>
  window.API_URL = 'https://URL-REAL-DA-API/data-hora';
</script>
<script src="./script.js"></script>
```

Sem outra configuração, o front-end usa a URL do Render definida no `index.html`.

A resposta da rota deve incluir `dataHora` como um instante em formato ISO, por
exemplo `2026-11-26T21:02:40.476Z`, e a lista `horarios`. Cada item da lista
contém `cidade`, `pais`, `fusoHorario`, `data` e `hora`. O front-end cria os
cartões a partir dessa lista e atualiza os relógios com base no mesmo instante.

## Funcionalidades

- Exibe todos os horários enviados pela API, atualmente Brasília, Nova York, Londres, Paris e Tóquio
- Atualiza os relógios a cada segundo a partir do instante recebido da API
- Botão para sincronizar novamente com a API
- Mensagem de carregamento e erro
