import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  loginUserAPI,
  getCurrentUserAPI,
  logoutUserAPI,
} from "./authService";



interface User {
  id?: string;
  name?: string;
  email?: string;
  // Add other user properties as needed
  accessToken?: string;
  refreshToken?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isError: boolean;
  message: string;
}



const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  isLoading: false,
  isError: false,
  message: "",
};

// ==================== ASYNC THUNKS ====================

export const loginUser = createAsyncThunk<
  User,                    // Return type
  any,                     // Argument type (userData)
  { rejectValue: string }  // ThunkAPI config
>(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      return await loginUserAPI(userData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  }
);

export const getCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      return await getCurrentUserAPI();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch user"
      );
    }
  }
);

export const logoutUser = createAsyncThunk<void, void>(
  "auth/logoutUser",
  async () => {
    logoutUserAPI();
  }
);

// ==================== SLICE ====================

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // You can add manual reducers here if needed in the future
    reset: (state) => {
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      // 🔐 LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.accessToken = action.payload.accessToken || null;
        state.refreshToken = action.payload.refreshToken || null;
        // Persist to localStorage
        localStorage.setItem("user", JSON.stringify(action.payload));
        if (action.payload.accessToken) {
          localStorage.setItem("accessToken", action.payload.accessToken);
        }
        if (action.payload.refreshToken) {
          localStorage.setItem("refreshToken", action.payload.refreshToken);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      //  GET CURRENT USER
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      //  LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isError = false;
        state.message = "";
        // Clear localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;