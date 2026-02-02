import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/users/userSlice';
import taskReducer from '../features/tasks/taskSlice';
import timetableReducer from '../features/timetable/timetableSlice';
import progressReducer from '../features/progress/progressSlice';
import aiReducer from '../features/ai/aiSlice';
import notificationReducer from '../features/notifications/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    tasks: taskReducer,
    timetable: timetableReducer,
    progress: progressReducer,
    ai: aiReducer,
    notifications: notificationReducer,
  },
});
