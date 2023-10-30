import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchNewPosts = createAsyncThunk("posts/fetchNewPosts", async (params) => {
  const { sortBy } = params;
  const res = await axios.get(`/posts?sortBy=${sortBy}`);
  return res.data;
});
export const fetchPopularPosts = createAsyncThunk("posts/fetchPopularPosts", async (params) => {
  const { sortBy } = params;
  const res = await axios.get(`/posts?sortBy=${sortBy}`);
  return res.data;
});

const initialState = {
  new: {
    items: [],
    isLoaded: false,
  },
  popular: {
    items: [],
    isLoaded: false,
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    deletePost: (state, action) => {
      state.new.items = state.new.items.filter((post) => post._id !== action.payload);
      state.popular.items = state.new.items.filter((post) => post._id !== action.payload);
    },
  },
  extraReducers: {
    [fetchNewPosts.pending]: (state) => {
      state.new.items = [];
      state.new.isLoaded = false;
    },
    [fetchNewPosts.fulfilled]: (state, action) => {
      state.new.items = [...state.new.items, ...action.payload];
      state.new.isLoaded = true;
    },
    [fetchNewPosts.rejected]: (state) => {
      state.new.items = [];
      state.new.isLoaded = false;
    },
    [fetchPopularPosts.pending]: (state) => {
      state.popular.items = [];
      state.popular.isLoaded = false;
    },
    [fetchPopularPosts.fulfilled]: (state, action) => {
      state.popular.items = [...state.popular.items, ...action.payload];
      state.popular.isLoaded = true;
    },
    [fetchPopularPosts.rejected]: (state) => {
      state.popular.items = [];
      state.popular.isLoaded = false;
    },
  },
});

export const postsReducer = postsSlice.reducer;

export const { deletePost } = postsSlice.actions;
