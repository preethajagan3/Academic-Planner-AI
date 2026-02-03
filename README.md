#  Academic Planner AI (Smart Study OS)


[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_App-FF4500?style=for-the-badge&logo=vercel)](https://academic-planner-ai-ojxe.vercel.app)

---

##  Overview

**Academic Planner AI** is not just a to-do list; it's an intelligent operating system for students. By combining modern web technologies with **Generative AI**, it transforms chaos into structured success. It helps students track deadlines, prioritize workloads, and receive personalized study advice—all in a stunning, distraction-free environment.

---

##  Key Features

###  AI-Powered Insights (Gemini Core)
- **Smart Recommendations:** The AI analyzes your pending tasks and suggests the best study order.
- **Micro-Motivation:** Get personalized encouragement based on your current workload.
- **Workload analysis:** Automatically detects when you are overloaded and suggests breaks.

###  Premium User Experience
- **Study Pulse:** A real-time efficiency meter that visualizes your productivity.
- **Global Dark Mode:** Seamless toggle between "Focus Day" and "Midnight Study" themes.
- **Dynamic Dashboard:** Widgets that adapt to your progress (e.g., "Peak Performance" vs. "Steady Progress").

###  Intelligent Task Management
- **Urgency Ranking:** Automatically flags high-priority deadlines.
- **Priority Stream:** A dedicated view for tasks that need immediate attention.
- **Visual Progress:** Beautiful charts and circular progress indicators for completion rates.

###  Smart Notifications system
- **Automated Reminders:** Never miss a deadline with automated email alerts via **Resend**.
- **Cron Jobs:** Backend schedulers that wake up to check your timetable for you.

---

##  Technology Stack

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

##  Snapshots
Dashboard
<img width="1919" height="885" alt="image" src="https://github.com/user-attachments/assets/5e1b26c8-5cae-4900-9614-f798dfde9506" />

Task creation
<img width="1919" height="880" alt="image" src="https://github.com/user-attachments/assets/7eb108d2-7848-440d-b1b9-c9ea8d00a30e" />

Planner
<img width="1918" height="863" alt="image" src="https://github.com/user-attachments/assets/f852a9d5-5b4c-446b-9771-6adc183761ff" />

time table
<img width="1919" height="865" alt="image" src="https://github.com/user-attachments/assets/65a507f4-9732-4ce6-9030-f00978d6605e" />

Metrics
<img width="1917" height="871" alt="image" src="https://github.com/user-attachments/assets/c2ac635b-88b8-4505-b81a-c0a2fff3c50f" />

Scheduler
<img width="1919" height="878" alt="image" src="https://github.com/user-attachments/assets/8c2e76bb-321e-4324-9c05-a9453ece151a" />

Personalized Recommendation
<img width="1919" height="868" alt="image" src="https://github.com/user-attachments/assets/c7d8b358-6df8-47e8-aaaa-4e2fc47635ed" />

Notification
<img width="1913" height="881" alt="image" src="https://github.com/user-attachments/assets/663d5b19-deac-43ee-a1e6-0431926a7dff" />

Profile
<img width="1919" height="881" alt="image" src="https://github.com/user-attachments/assets/f1dcdccc-d449-409f-b03a-98b3d73b9594" />

Chatbot for Quick Queries
<img width="1663" height="788" alt="image" src="https://github.com/user-attachments/assets/40bc2d08-78c1-4215-b658-8cb03ff47fbe" />


---

##  Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/your-username/academic-planner-ai.git](https://github.com/your-username/academic-planner-ai.git)
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

##  Contributing

Contributions are welcome! Please fork the repository and create a pull request for any feature enhancements.

---

<p align="center">
  Made with 💜 by Preetha
</p>
