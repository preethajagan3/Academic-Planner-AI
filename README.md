# 🎓 Academic Planner AI (Smart Study OS)

> **"Your Personal AI-Powered Academic Strategist"**

[![React](https://img.shields.io/badge/Frontend-React_Vite-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Gemini](https://img.shields.io/badge/AI_Engine-Google_Gemini-8E75B2?style=for-the-badge&logo=google)](https://deepmind.google/technologies/gemini/)

---

## 🚀 Overview

**Academic Planner AI** is not just a to-do list; it's an intelligent operating system for students. By combining modern web technologies with **Generative AI**, it transforms chaos into structured success. It helps students track deadlines, prioritize workloads, and receive personalized study advice—all in a stunning, distraction-free environment.

---

## ✨ Key Features

### 🧠 AI-Powered Insights (Gemini Core)
- **Smart Recommendations:** The AI analyzes your pending tasks and suggests the best study order.
- **Micro-Motivation:** Get personalized encouragement based on your current workload.
- **Workload analysis:** Automatically detects when you are overloaded and suggests breaks.

### 🎨 Premium User Experience
- **Study Pulse:** A real-time efficiency meter that visualizes your productivity.
- **Global Dark Mode:** Seamless toggle between "Focus Day" and "Midnight Study" themes.
- **Dynamic Dashboard:** Widgets that adapt to your progress (e.g., "Peak Performance" vs. "Steady Progress").

### ⚡ Intelligent Task Management
- **Urgency Ranking:** Automatically flags high-priority deadlines.
- **Priority Stream:** A dedicated view for tasks that need immediate attention.
- **Visual Progress:** Beautiful charts and circular progress indicators for completion rates.

### 🔔 Smart Notifications system
- **Automated Reminders:** Never miss a deadline with automated email alerts via **Resend**.
- **Cron Jobs:** Backend schedulers that wake up to check your timetable for you.

---

## 🛠️ Technology Stack

### **Frontend (Client)**
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS (Custom Design System)
- **State Management:** Redux Toolkit
- **Icons:** Heroicons & Lucide React

### **Backend (Server)**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Scheduling:** Node-Cron

### **External Services**
- **AI Model:** Google Gemini API
- **Email Service:** Resend API
- **Deployment:** Vercel (Frontend) & Render (Backend)

---

## 📸 Snapshots

*(Add your screenshots here)*

---

## 🔧 Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/academic-planner-ai.git
    cd academic-planner-ai
    ```

2.  **Install Dependencies**
    ```bash
    # Frontend
    cd frontend
    npm install

    # Backend
    cd ../backend
    npm install
    ```

3.  **Environment Variables (.env)**
    *Create a `.env` file in `backend/`:*
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    GEMINI_API_KEY=your_gemini_key
    RESEND_API_KEY=your_resend_key
    PORT=5001
    ```

4.  **Run Locally**
    ```bash
    # Terminal 1 (Backend)
    cd backend
    npm start

    # Terminal 2 (Frontend)
    cd frontend
    npm run dev
    ```

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request for any feature enhancements.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with 💜 by [Your Name]
</p>
