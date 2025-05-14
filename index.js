const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: './session'
  }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox']
  }
});

client.on('qr', qr => qrcode.generate(qr, { small: true }));
client.on('authenticated', session => console.log('✅ Autenticado'));
client.on('ready', () => console.log('🤖 Bot pronto!'));

client.initialize();
