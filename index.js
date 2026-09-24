const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const JOIN_LINK = "https://t.me/+aU8NKqNzrlNhZWY0";

if (!BOT_TOKEN) {
  console.error("❌ BOT_TOKEN is missing!");
  process.exit(1);
}

const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;



// Home / health check
app.get("/", (req, res) => {
  res.status(200).send("👑 Royal VIP Bot is Online ✅");
});

// Telegram webhook
app.post("/webhook", async (req, res) => {
  // Telegram ko immediately response
  res.sendStatus(200);

  try {
    const update = req.body;

    // Sirf join requests handle karo
    if (!update.chat_join_request) {
      return;
    }

    const request = update.chat_join_request;

    // User ka private chat ID
    const userChatId = request.user_chat_id;

    if (!userChatId) {
      console.log("❌ User chat ID not found");
      return;
    }

    const firstName = request.from?.first_name || "Trader";

    const message = `
👑 𝗥𝗢𝗬𝗔𝗟 𝗩𝗜𝗣 𝗔𝗖𝗖𝗘𝗦𝗦 👑

🔥 𝗛𝗲𝗹𝗹𝗼 ${firstName}!

Your join request has been received successfully. ✅

💎 𝗩𝗜𝗣 𝗦𝗜𝗚𝗡𝗔𝗟𝗦
⚡ Premium Sessions
📊 Market Updates
👑 Exclusive VIP Access

👇 𝗝𝗢𝗜𝗡 𝗡𝗢𝗪 👇
`;

    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: userChatId,
      text: message,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "👑 JOIN VIP CHANNEL",
              url: JOIN_LINK
            }
          ],
          [
            {
              text: "🔥 JOIN NOW 🔥",
              url: JOIN_LINK
            }
          ]
        ]
      }
    });

    console.log(`✅ Message sent to ${userChatId}`);

  } catch (error) {
    console.error(
      "❌ Telegram Error:",
      error.response?.data || error.message
    );
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Royal VIP Bot running on port ${PORT}`);
});
