# 22BFA12105
# 🔗 Affordmed Logger - URL Shortener Microservice

This is a full-stack URL Shortener microservice built for the Affordmed pre-assessment. It allows users to shorten long URLs with optional custom shortcodes and provides analytics such as total clicks, expiration, and access details.

## 🚀 Tech Stack

- **Frontend**: React (Vite) + Material UI
- **Backend**: Node.js + Express
- **Logger Middleware**: Custom logging system with token-based evaluation service
- **Database**: In-memory (no external DB)
- **Auth**: Bearer Token (for evaluation logging)

---

## 📸 Features

- ✂️ Shorten long URLs with optional custom shortcodes
- 📆 Set expiration time in minutes (default: 30 mins)
- 📊 Track number of clicks, referrer, and country (mocked as "India")
- 🔐 Logging of all frontend/backend events using a secure middleware
- ⚠️ Handles shortcode collision and expiration errors gracefully

---
