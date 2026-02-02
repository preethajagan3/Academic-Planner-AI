import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Timetable from './pages/Timetable';
import Progress from './pages/Progress';
import AITips from './pages/AITips';
import Profile from './pages/Profile';
import Recommendations from './pages/Recommendations';
import Notifications from './pages/Notifications';
import VisualPlanner from './pages/VisualPlanner';
import ProtectedRoute from './components/ProtectedRoute';
import Chatbot from './components/Chatbot';
import { useEffect } from 'react';
import { BookIcon, BeakerIcon, AcademicCapIcon, BrainIcon, DocumentIcon } from './components/Icons';

function App() {
  const { token, user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.user);

  useEffect(() => {
    // Check system preference or localStorage for dark mode
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      <div className="floating-bg">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="floating-item"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          >
            {[
              <BookIcon className="w-8 h-8 opacity-20" />,
              <BeakerIcon className="w-8 h-8 opacity-20" />,
              <AcademicCapIcon className="w-8 h-8 opacity-20" />,
              <BrainIcon className="w-8 h-8 opacity-20" />,
              <DocumentIcon className="w-8 h-8 opacity-20" />
            ][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/timetable"
          element={
            <ProtectedRoute>
              <Timetable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-tips"
          element={
            <ProtectedRoute>
              <AITips />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommendations"
          element={
            <ProtectedRoute>
              <Recommendations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/planner"
          element={
            <ProtectedRoute>
              <VisualPlanner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;
