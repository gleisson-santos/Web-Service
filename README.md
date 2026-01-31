# 🌐 Web Service WhatsApp API

Uma micro-API Express.js simples para envio de mensagens WhatsApp utilizando `whatsapp-web.js`.

![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![WhatsApp](https://img.shields.io/badge/Lib-whatsapp--web.js-25D366)

## 📌 Funcionalidades

*   **Autenticação QR Code**: Exibe o QR Code no terminal para conexão.
*   **Endpoint de Envio**: API `POST /send` para disparar mensagens programaticamente.

## 🛠️ Como Usar

### 1. Instalação
```bash
npm install
```

### 2. Execução
```bash
node index.js
```
Escaneie o QR Code que aparecerá no terminal com seu WhatsApp.

### 3. Enviar Mensagem via API
Faça uma requisição POST para `http://localhost:3000/send`:

```json
{
  "number": "5511999999999",
  "message": "Olá do seu Web Service!"
}
```

## 📝 Requisitos
*   Node.js instalado.
*   Google Chrome (para o Puppeteer funcionar).

Desenvolvido por [Gleisson Santos](https://github.com/gleisson-santos).
