import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { timetableAPI } from './timetableAPI';

const initialState = {
  entries: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Get timetable
export const getTimetable = createAsyncThunk(
  'timetable/getAll',
  async (_, thunkAPI) => {
    try {
      return await timetableAPI.getTimetable();
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to fetch timetable';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create timetable entry
export const createTimetableEntry = createAsyncThunk(
  'timetable/create',
  async (entryData, thunkAPI) => {
    try {
      return await timetableAPI.createTimetableEntry(entryData);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to create entry';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update timetable entry
export const updateTimetableEntry = createAsyncThunk(
  'timetable/update',
  async ({ id, entryData }, thunkAPI) => {
    try {
      return await timetableAPI.updateTimetableEntry(id, entryData);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to update entry';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete timetable entry
export const deleteTimetableEntry = createAsyncThunk(
  'timetable/delete',
  async (id, thunkAPI) => {
    try {
      await timetableAPI.deleteTimetableEntry(id);
      return id;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to delete entry';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const timetableSlice = createSlice({
  name: 'timetable',
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
      // Get timetable
      .addCase(getTimetable.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTimetable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entries = action.payload;
      })
      .addCase(getTimetable.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create entry
      .addCase(createTimetableEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTimetableEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.entries.push(action.payload);
      })
      .addCase(createTimetableEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update entry
      .addCase(updateTimetableEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTimetableEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.entries.findIndex(entry => entry._id === action.payload._id);
        if (index !== -1) {
          state.entries[index] = action.payload;
        }
      })
      .addCase(updateTimetableEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete entry
      .addCase(deleteTimetableEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTimetableEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.entries = state.entries.filter(entry => entry._id !== action.payload);
      })
      .addCase(deleteTimetableEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = timetableSlice.actions;
export default timetableSlice.reducer;
