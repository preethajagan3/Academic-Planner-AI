import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userAPI } from './userAPI';

const initialState = {
  profile: null,
  isLoading: false,
  isError: false,
  message: '',
};

// Get user profile
export const getUserProfile = createAsyncThunk(
  'user/getProfile',
  async (_, thunkAPI) => {
    try {
      return await userAPI.getProfile();
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to fetch profile';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData, thunkAPI) => {
    try {
      return await userAPI.updateProfile(userData);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to update profile';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
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
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
