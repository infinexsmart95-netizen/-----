const axios = require("axios");

const BOT_TOKEN = process.env.BOT_TOKEN;
const JOIN_LINK = "https://t.me/+aU8NKqNzrlNhZWY0";

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(200).send("👑 Royal VIP Bot is Online");
  }

  try {
    const update = req.body;

    if (!update || !update.chat_join_request) {
      return res.status(200).json({ ok: true });
    }

    const request = update.chat_join_request;
    const userChatId = request.user_chat_id;
    const firstName = request.from?.first_name || "Trader";

    if (!userChatId) {
      return res.status(200).json({ ok: true });
    }

    const message = `
👑 𝗥𝗢𝗬𝗔𝗟 𝗩𝗜𝗣 𝗔𝗖𝗖𝗘𝗦𝗦 👑

🔥 Hello ${firstName}!

Your join request has been received successfully. ✅

💎 𝗩𝗜𝗣 𝗦𝗜𝗚𝗡𝗔𝗟𝗦
⚡ Premium Sessions
📊 Market Updates
👑 Exclusive VIP Access

👇 𝗝𝗢𝗜𝗡 𝗡𝗢𝗪 👇
`;

    await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
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
      }
    );

    return res.status(200).json({
      ok: true
    });

  } catch (error) {
    console.error(
      error.response?.data || error.message
    );

    return res.status(500).json({
      ok: false,
      error: error.response?.data || error.message
    });
  }
};
