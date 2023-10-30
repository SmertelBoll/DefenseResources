import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const res = await axios.post("/auth/login", params);
  return res.data;
});

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const res = await axios.get("/auth/me");
  return res.data;
});

export const fetchRegister = createAsyncThunk("auth/fetchRegister", async (params) => {
  try {
    const res = await axios.post("/auth/register", params);
    return { data: res.data };
  } catch (error) {
    return { error };
  }
});

const initialState = {
  data: null,
  isLoaded: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.isLoaded = false;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.data = null;
      state.isLoaded = false;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoaded = true;
    },
    [fetchAuth.rejected]: (state) => {
      state.data = null;
      state.isLoaded = false;
    },
    [fetchAuthMe.pending]: (state) => {
      state.data = null;
      state.isLoaded = false;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoaded = true;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.data = null;
      state.isLoaded = false;
    },
    [fetchRegister.pending]: (state) => {
      state.data = null;
      state.isLoaded = false;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      if (action.payload.data) {
        state.data = action.payload.data;
        state.isLoaded = true;
      } else {
        state.data = null;
        state.isLoaded = false;
      }
    },
    [fetchRegister.rejected]: (state) => {
      state.data = null;
      state.isLoaded = false;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
