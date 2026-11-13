# front-end-projeto-express

Front-end simples para consumir a API de data e hora da aula 04.
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

O arquivo `script.js` usa a URL abaixo por padrão para execução local:

```js
const API_URL = 'http://localhost:3000/data-hora';
```

Para executar localmente, inicie a API na porta 3000 antes de abrir o front-end. Quando a API estiver publicada no Render, defina `window.API_URL` com a URL real do endpoint antes de carregar `script.js` no `index.html`:

```html
<script>
  window.API_URL = 'https://URL-REAL-DA-API/data-hora';
</script>
<script src="./script.js"></script>
```

Sem essa configuração, o front-end continua usando `http://localhost:3000/data-hora`.

## Funcionalidades

- Exibe a data recebida da API
- Exibe a hora recebida da API
- Botão para consultar novamente
- Mensagem de carregamento e erro
