# ☕ BuyMe Chai — Creator Support Platform

A full-stack creator tipping and support platform inspired by *Buy Me a Coffee*, localized for the Indian market with **Razorpay** payment integration.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-green?style=flat-square&logo=mongodb)
![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=flat-square&logo=razorpay)

## 🚀 Features

- 🔐 **Authentication** — Secure login via NextAuth.js (Credentials + OAuth)
- 💳 **Payments** — Razorpay integration for INR-based creator tipping
- 👤 **Creator Profiles** — Personalized public pages for each creator
- 📊 **Dashboard** — Track support received and manage your profile
- 🌐 **Full-Stack** — Next.js App Router with server actions & API routes
- 🗄️ **Database** — MongoDB with Mongoose for persistent data storage

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | JavaScript (ES6+) |
| Styling | Tailwind CSS |
| Auth | NextAuth.js |
| Payments | Razorpay |
| Database | MongoDB + Mongoose |
| Deployment | Vercel |

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- MongoDB URI
- Razorpay API Keys

### Installation

```bash
git clone https://github.com/aadil-qamri/buyme-chai.git
cd buyme-chai
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
buyme-chai/
├── app/               # Next.js App Router pages & API routes
├── components/        # Reusable UI components
├── models/            # Mongoose schema definitions
├── lib/               # Utility functions & DB connection
└── public/            # Static assets
```

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

## 📄 License

[MIT](LICENSE)

---

Built with ❤️ by [Aadil Qamri](https://github.com/aadil-qamri)
