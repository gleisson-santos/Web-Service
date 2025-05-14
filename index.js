const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const app = express();

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: './session' // salva a sessão autenticada
  }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox']
  }
});

client.on('qr', qr => {
  console.log('⚠️ Escaneie o QR code abaixo:');
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
  console.log('✅ Autenticado com sucesso!');
});

client.on('ready', () => {
  console.log('🤖 Bot está pronto!');
});

app.use(express.json());

// Rota para enviar mensagens
app.post('
