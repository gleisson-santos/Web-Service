const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const qrcode = require('qrcode-terminal');

const app = express();
const port = process.env.PORT || 3000;

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox']
  }
});

client.on('qr', (qr) => {
  console.log('📱 Escaneie o QR Code abaixo para autenticar:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('🤖 Bot está pronto!');
});

client.on('message', async msg => {
  if (msg.body === '!ping') {
    msg.reply('pong 🏓');
  }
});

client.initialize();

app.get('/', (req, res) => {
  res.send('✅ Bot WhatsApp está online!');
});

app.get('/send', async (req, res) => {
  const to = req.query.to;
  const msg = req.query.msg;

  if (!to || !msg) {
    return res.status(400).send('Parâmetros ausentes. Use /send?to=NUMERO&msg=MENSAGEM');
  }

  try {
    const chatId = to + '@c.us';
    await client.sendMessage(chatId, msg);
    res.send(`✅ Mensagem enviada para ${to}`);
  } catch (err) {
    res.status(500).send('❌ Erro ao enviar mensagem: ' + err.message);
  }
});

app.listen(port, () => {
  console.log(`🌐 Servidor rodando em http://localhost:${port}`);
});