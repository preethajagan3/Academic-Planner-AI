# Student Planner - Frontend

A modern, clean, and student-friendly React frontend for the Student Planner application.

## 🚀 Tech Stack

- **React** with Vite
- **Redux Toolkit** for state management
- **React Router DOM** for navigation
- **Axios** for API calls
- **Tailwind CSS** for styling
- **JWT Authentication**

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   └── store.js                 # Redux store configuration
│   │
│   ├── features/
│   │   ├── auth/                    # Authentication
│   │   │   ├── authSlice.js
│   │   │   └── authAPI.js
│   │   ├── users/                   # User profile
│   │   │   ├── userSlice.js
│   │   │   └── userAPI.js
│   │   ├── tasks/                   # Task management
│   │   │   ├── taskSlice.js
│   │   │   └── taskAPI.js
│   │   ├── timetable/               # Timetable/schedule
│   │   │   ├── timetableSlice.js
│   │   │   └── timetableAPI.js
│   │   ├── progress/                # Study progress
│   │   │   ├── progressSlice.js
│   │   │   └── progressAPI.js
│   │   └── ai/                      # AI tips
│   │       ├── aiSlice.js
│   │       └── aiAPI.js
│   │
│   ├── components/
│   │   ├── Navbar.jsx               # Top navigation
│   │   ├── Sidebar.jsx              # Side navigation
│   │   ├── ProtectedRoute.jsx       # Route protection
│   │   ├── Loader.jsx               # Loading spinner
│   │   └── StatCard.jsx             # Dashboard stat cards
│   │
│   ├── pages/
│   │   ├── Login.jsx                # Login page
│   │   ├── Register.jsx             # Registration page
│   │   ├── Dashboard.jsx            # Main dashboard
│   │   ├── Tasks.jsx                # Task management
│   │   ├── Timetable.jsx            # Schedule management
│   │   ├── Progress.jsx             # Study progress tracking
│   │   ├── AITips.jsx               # AI recommendations
│   │   └── Profile.jsx              # User profile
│   │
│   ├── services/
│   │   └── api.js                   # Axios instance & interceptors
│   │
│   ├── App.jsx                      # Main App component
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Global styles
│
├── tailwind.config.js               # Tailwind configuration
├── postcss.config.js                # PostCSS configuration
├── vite.config.js                   # Vite configuration
└── package.json                     # Dependencies
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on http://localhost:5000

### Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`

## 🔑 Features

### Authentication
- User registration with validation
- Secure JWT-based login
- Automatic token management
- Protected routes

### Dashboard
- Overview of tasks, progress, and deadlines
- Quick statistics cards
- Upcoming deadlines preview
- Recent progress summary

### Task Management
- Create, read, update, delete tasks
- Mark tasks as completed
- Set deadlines and priorities
- Filter and sort tasks

### Timetable
- Weekly schedule view
- Add class/study sessions
- Organize by day and time
- Location tracking

### Progress Tracking
- Log study hours
- Track subjects studied
- View study history
- Calculate total study time

### AI Tips
- Get personalized study recommendations
- AI-powered productivity insights
- Refresh for new tips

### Profile
- View account information
- Display user statistics
- Profile customization

## 🔐 API Integration

The frontend connects to the backend at `http://localhost:5000/api`

### Endpoints Used:

**Authentication:**
- POST `/auth/register` - User registration
- POST `/auth/login` - User login

**User:**
- GET `/users/profile` - Get user profile

**Tasks:**
- GET `/tasks` - Get all tasks
- POST `/tasks` - Create task
- PUT `/tasks/:id` - Update task
- DELETE `/tasks/:id` - Delete task

**Timetable:**
- GET `/timetable` - Get timetable
- POST `/timetable` - Add timetable entry

**Progress:**
- GET `/progress` - Get progress data
- POST `/progress` - Log progress

**AI:**
- GET `/ai/tips` - Get AI recommendations

## 🎨 Design Features

- **Light Theme:** Clean, professional appearance
- **Student-Friendly:** Designed for academic use
- **Responsive:** Works on all screen sizes
- **Accessible:** Clear typography and navigation
- **Minimal:** No distracting animations

## 🔧 Configuration

### API Base URL

The API base URL is configured in `src/services/api.js`:

```javascript
baseURL: 'http://localhost:5000/api'
```

To change the backend URL, update this value.

### Vite Proxy

The `vite.config.js` includes a proxy configuration for development:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  }
}
```

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## 🧪 Testing the Application

1. Start the backend server first
2. Start the frontend: `npm run dev`
3. Register a new account
4. Login and explore all features

## 🚨 Common Issues

### Backend Connection Issues
- Ensure backend is running on port 5000
- Check CORS is enabled on backend
- Verify API endpoints match backend routes

### Authentication Issues
- Clear localStorage if having login issues
- Check JWT token format in backend
- Verify token expiration settings

## 📝 Notes

- JWT tokens are stored in localStorage
- Automatic logout on 401 responses
- All routes except login/register require authentication
- Form validation on all input fields

## 🤝 Contributing

This is an academic project. For improvements:
1. Follow the existing code structure
2. Maintain consistent styling
3. Test all features before committing
4. Update documentation as needed

## 📄 License

Academic use only - Final Year Project

## 👨‍💻 Developer

Built for academic submission - Full Stack Student Planner Application
