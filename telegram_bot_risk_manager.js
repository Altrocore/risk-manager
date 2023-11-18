const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Привет! Я бот-риск-менеджер. Я могу помочь вам вычислить количество монет для покупки или продажи.');
    bot.sendMessage(msg.chat.id, 'Использование: /trade <баланс> <точка входа> <уровень стопа> <процент риска>');
});

bot.onText(/\/trade (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const args = match[1].split(' ');

    try {
        const balance = parseFloat(args[0]);
        const entryPoint = parseFloat(args[1]);
        const stopLevel = parseFloat(args[2]);
        const riskPercent = parseFloat(args[3]);

        const risk = balance * (riskPercent / 100);
        const distance = Math.abs(entryPoint - stopLevel);
        const volume = (risk / distance);

        const takeProfitLevel = entryPoint + (3 * distance);

        bot.sendMessage(chatId, `Количество монет для покупки или продажи: ${volume.toFixed(2)}\nУровень тейк-профита: ${takeProfitLevel}`);
    } catch (error) {
        bot.sendMessage(chatId, 'Использование: /trade <баланс> <точка входа> <уровень стопа> <процент риска>');
    }
});
