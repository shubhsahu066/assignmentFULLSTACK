require("dotenv").config();

const TelegramBot =
    require("node-telegram-bot-api");

const { decodeQR } = require("./qr");
const {
    extractRollNumber,
    isRegistered
} = require("./parser");

const {
    markPresent,
    getStats
} = require("./attendance");

// const bot = new TelegramBot(
//     process.env.BOT_TOKEN,
//     { polling: true }
// );

const bot = new TelegramBot(
    process.env.BOT_TOKEN,
    { polling: true }
);

bot.on("polling_error", console.log);

bot.onText(/\/start/, msg => {
    bot.sendMessage(
        msg.chat.id,
        "Send IITK ID card photo."
    );
});

const fs = require("fs");
const path = require("path");

bot.on("photo", async msg => {
    try {
        const photo =
            msg.photo[msg.photo.length - 1];

        const filePath = await bot.downloadFile(
            photo.file_id,
            __dirname
        );

        const qrString = await decodeQR(filePath);

        const rollNumber =
            extractRollNumber(qrString);

        if (!rollNumber) {
            return bot.sendMessage(
                msg.chat.id,
                "Roll number not found"
            );
        }

        if (!isRegistered(rollNumber)) {
            return bot.sendMessage(
                msg.chat.id,
                "Student not registered"
            );
        }

        const result =
            markPresent(rollNumber);

        if (!result.success) {
            return bot.sendMessage(
                msg.chat.id,
                `Already marked at ${result.timestamp}`
            );
        }

        bot.sendMessage(
            msg.chat.id,
            `Attendance marked for ${rollNumber}`
        );

    } catch (err) {
        bot.sendMessage(
            msg.chat.id,
            err.message
        );
    }
});

bot.onText(/\/report/, msg => {
    const stats = getStats();

    bot.sendMessage(
        msg.chat.id,
        `Total: ${stats.total}

${stats.rollNumbers.join("\n")}`
    );
});

console.log("Bot started successfully");
