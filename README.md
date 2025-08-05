# Auth App

A modern, full-stack authentication system with JWT, built using the MERN stack and TailwindCSS. This monorepo contains separate `frontend` and `backend` folders, following clean architecture and scalable patterns.

---

## ✨ Features

- User signup and login with JWT
- Password hashing with bcrypt
- Input validation using Joi
- Secure .env-based secrets
- Toast notifications for user feedback
- Protected routes for authenticated users
- Responsive, modern UI built with Tailwind CSS
- Separate frontend (React + Vite) and backend (Express + MongoDB)
- Fully monorepo-structured with separate `.gitignore`

---

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/auth-app.git
cd auth-app
2️⃣ Backend Setup
bash
Copy
Edit
cd backend
npm install
Create a .env file in /backend with:

ini
Copy
Edit
PORT=8000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
Then run:

bash
Copy
Edit
npm start
3️⃣ Frontend Setup
In a separate terminal:

bash
Copy
Edit
cd frontend
npm install
npm run dev

