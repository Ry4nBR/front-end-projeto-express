# front-end-projeto-express

Front-end simples para consumir a API de data e hora da aula 04.

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

O arquivo `script.js` usa a URL abaixo por padrão:

```js
const API_URL = 'http://localhost:3000/data-hora';
```

Quando a API estiver publicada no Render, substitua pela URL pública real do serviço para o ambiente de produção.

## Funcionalidades

- Exibe a data recebida da API
- Exibe a hora recebida da API
- Botão para consultar novamente
- Mensagem de carregamento e erro
