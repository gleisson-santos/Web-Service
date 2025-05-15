const express = require('express');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox'],
    },
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Cliente pronto!');
});

client.initialize();

app.post('/send', async (req, res) => {
    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).send('Número e mensagem obrigatórios!');
    }

    try {
        const chatId = number.includes('@c.us') ? number : `${number}@c.us`;
        await client.sendMessage(chatId, message);
        res.send('Mensagem enviada!');
    } catch (err) {
        res.status(500).send('Erro ao enviar: ' + err.message);
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
