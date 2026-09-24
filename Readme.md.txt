# 👑 Royal VIP Telegram Bot

Telegram bot that detects channel join requests and sends the requester a private message with a VIP channel button.

## Features

- Detects Telegram join requests
- Does NOT automatically approve requests
- Sends private DM to requester
- VIP join button
- Express webhook server
- GitHub ready
- Node.js compatible

## Environment Variable

BOT_TOKEN=YOUR_BOT_TOKEN

## Webhook

After deployment, set:

https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook?url=https://YOUR-DOMAIN.com/webhook&allowed_updates=["chat_join_request"]

## Required Telegram Permission

The bot must be an administrator in the channel and have the required invite-user/join-request management permission.