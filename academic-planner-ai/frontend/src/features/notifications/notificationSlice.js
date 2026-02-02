import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notificationAPI } from './notificationAPI';

const initialState = {
    notifications: [],
    isLoading: false,
    isError: false,
    message: '',
};

export const getNotifications = createAsyncThunk(
    'notifications/getAll',
    async (_, thunkAPI) => {
        try {
            return await notificationAPI.getNotifications();
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to fetch notifications';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const checkDeadlines = createAsyncThunk(
    'notifications/check',
    async (_, thunkAPI) => {
        try {
            return await notificationAPI.checkDeadlines();
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to check deadlines';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const markAsRead = createAsyncThunk(
    'notifications/read',
    async (id, thunkAPI) => {
        try {
            return await notificationAPI.markAsRead(id);
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to mark as read';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const clearNotifications = createAsyncThunk(
    'notifications/clear',
    async (_, thunkAPI) => {
        try {
            return await notificationAPI.clearAll();
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to clear notifications';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotifications.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notifications = action.payload;
            })
            .addCase(getNotifications.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(markAsRead.fulfilled, (state, action) => {
                state.notifications = state.notifications.map((n) =>
                    n._id === action.payload._id ? action.payload : n
                );
            })
            .addCase(clearNotifications.fulfilled, (state) => {
                state.notifications = [];
            });
    },
});

export const { reset } = notificationSlice.actions;
export default notificationSlice.reducer;
