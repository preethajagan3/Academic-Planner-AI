import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { progressAPI } from './progressAPI';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Get progress
export const getProgress = createAsyncThunk(
  'progress/getAll',
  async (_, thunkAPI) => {
    try {
      return await progressAPI.getProgress();
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to fetch progress';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create progress
export const createProgress = createAsyncThunk(
  'progress/create',
  async (progressData, thunkAPI) => {
    try {
      return await progressAPI.createProgress(progressData);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to create progress';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update progress
export const updateProgress = createAsyncThunk(
  'progress/update',
  async ({ id, progressData }, thunkAPI) => {
    try {
      return await progressAPI.updateProgress(id, progressData);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to update progress';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete progress
export const deleteProgress = createAsyncThunk(
  'progress/delete',
  async (id, thunkAPI) => {
    try {
      await progressAPI.deleteProgress(id);
      return id;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to delete progress';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Get progress
      .addCase(getProgress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create progress
      .addCase(createProgress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data.push(action.payload);
      })
      .addCase(createProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update progress
      .addCase(updateProgress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.data.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete progress
      .addCase(deleteProgress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = state.data.filter(item => item._id !== action.payload);
      })
      .addCase(deleteProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = progressSlice.actions;
export default progressSlice.reducer;
