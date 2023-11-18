const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => {
    ctx.reply('Привет! Я бот-риск-менеджер. Я могу помочь вам вычислить количество монет для покупки или продажи.');
    ctx.reply('Использование: /trade <баланс> <точка входа> <уровень стопа> <процент риска>');
})

bot.command('trade', (ctx) => {
    const args = ctx.message.text.split(' ').slice(1);

    try {
        const balance = parseFloat(args[0]);
        const entryPoint = parseFloat(args[1]);
        const stopLevel = parseFloat(args[2]);
        const riskPercent = parseFloat(args[3]);

        const risk = balance * (riskPercent / 100);
        const distance = Math.abs(entryPoint - stopLevel);
        const volume = (risk / distance);

        const takeProfitLevel = entryPoint + (3 * distance);

        ctx.reply(`Количество монет для покупки или продажи: ${volume.toFixed(2)}\nУровень тейк-профита: ${takeProfitLevel}`);
    } catch (error) {
        ctx.reply('Использование: /trade <баланс> <точка входа> <уровень стопа> <процент риска>');
    }
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))