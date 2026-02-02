import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { aiAPI } from './aiAPI';

const initialState = {
  tips: [],
  preferences: {},
  smartSlots: [],
  isLoading: false,
  isError: false,
  message: '',
};

// Get AI tips
export const getAITips = createAsyncThunk(
  'ai/getTips',
  async (_, thunkAPI) => {
    try {
      return await aiAPI.getTips();
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to fetch AI tips';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const aiSlice = createSlice({
  name: 'ai',
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
      .addCase(getAITips.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAITips.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tips = action.payload.tips || [];
        state.preferences = action.payload.preferences || {};
        state.smartSlots = action.payload.smartSlots || [];
      })
      .addCase(getAITips.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = aiSlice.actions;
export default aiSlice.reducer;
