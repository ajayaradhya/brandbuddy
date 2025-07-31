
# 🌟 BrandBuddy — Your Brand Collab Sidekick

**BrandBuddy** is a collaboration management tool purpose-built for modern content creators, influencers, and indie brand partners. Designed by and for creators like *Maitri & Ajay*, it’s the backstage assistant that tracks your campaigns, barter deals, follow-ups, payments, and brand performance — all from one sleek, intuitive dashboard.

---

## 🧠 Why BrandBuddy?

Managing dozens of Instagram DMs, email threads, spreadsheets, and reminders to track brand deals is *not scalable*. **BrandBuddy** is your single source of truth — keeping your collaborations structured, searchable, and visually insightful.

---

## ✨ Features

### 📊 Creator Dashboard
- Total brands, campaigns, barter & paid breakdowns
- Smart reminders (overdue follow-ups, upcoming deliveries)
- Visual charts of your monthly growth
- Top performing brands by engagement & revenue

### 📅 Calendar View
- Clean monthly view of deadlines, deliveries & payments
- Tooltip & modal view with quick summaries

### 🏷️ Brands Management
- Quick search & filter by industry, status, or name
- Logo preview, Instagram link, contact info
- Add/edit/delete brands with just a click

### 📦 Campaigns Page
- Detailed status filters (Ongoing, Pending, Completed, etc.)
- Expandable notes & media previews
- Track barter value, deliverables & payments
- Add/update/delete campaigns with confirmation

### 🔐 Google OAuth Login (Multi-User Ready)
- Secure login with Google Authentication
- Prepping for team collab mode in future versions

---

## 🛠️ Tech Stack

| Layer      | Tech Used                         |
|------------|-----------------------------------|
| Frontend   | React (w/ Vite), MUI, Recharts    |
| Backend    | Django, Django REST Framework     |
| Auth       | Google OAuth 2.0 via `google-identity` |
| DB         | PostgreSQL                        |
| Charts     | Recharts                          |
| Hosting    | TBD / Local                       |

---

## 📦 Installation

```bash
# Backend
cd backend/
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Frontend
cd frontend/
npm install
npm run dev
```

---

## 🧪 Test Data

To simulate real-world scenarios, run the custom command:

```bash
python manage.py generate_mock_data
```

This populates:
- Popular travel & lifestyle brands
- Sample paid and barter campaigns
- Monthly delivery & payment dates

---

## 🚧 Roadmap

- 🧑‍🤝‍🧑 Multi-user team support
- 📬 In-app DM templates
- 📂 Drive/Dropbox deliverables sync
- 🔔 Push/email reminders
- 💰 ROI calculator & payout tracker
- 🤝 Brand discovery & rating system

---

## 🤝 Built for Creators, by Creators

> We’re full-time travel content creators building this tool out of real-world frustration managing brand deals. BrandBuddy helps us stay professional, organized, and scale faster without burning out.

Follow our journey on Instagram: [@maitriandajay](https://instagram.com/maitriandajay)

---

## 💬 Feedback & Contributions

BrandBuddy is in active development — we’d love your input!

Open issues or feature ideas? Start a conversation [here](#).

---

## 📄 License

MIT — use freely, attribute kindly.

---

> 🚀 *Let BrandBuddy handle the spreadsheets, so you can focus on storytelling.*
