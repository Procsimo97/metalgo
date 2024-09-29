import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    name: string;
    email: string;
  }
  
  interface AuthState {
    user: User | null;
  }
  
  const initialState: AuthState = {
    user: null,
  };
  
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      login: (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        sessionStorage.setItem("user", JSON.stringify(action.payload));
      },
      logout: (state) => {
        state.user = null;
        sessionStorage.removeItem("user");
      },
      initializeAuth: (state) => {
        const savedUser = sessionStorage.getItem("user");
        if (savedUser) {
          state.user = JSON.parse(savedUser);
        }
      },
    },
  });
  
  export const { login, logout, initializeAuth } = authSlice.actions;
  export default authSlice.reducer;