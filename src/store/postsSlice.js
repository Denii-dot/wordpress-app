import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request, ENDPOINTS, CHUNK_SIZE } from "../helpers/axios";

const initialState = {
  foundPosts: 0,
  posts: [],
  isLoading: false,
  number: CHUNK_SIZE,
  offset: 0,
  counter: 0,
};

export const fetchAmountPosts = createAsyncThunk("posts/fetch", async () => {
  try {
    return (await request.get(ENDPOINTS.POSTS)).data;
  } catch (err) {
    throw new Error(err.message);
  }
});

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (param1, thunkAPI) => {
    try {
      const { number, offset } = thunkAPI.getState().posts;
      const params = { number, offset };
      let response = (await request.get(ENDPOINTS.POSTS, { params })).data;
      response = {
        posts: response.posts.map((post) => ({
          ID: post.ID,
          site_ID: post.site_ID,
          author: {
            ID: post.author.ID,
            first_name: post.author.first_name,
            last_name: post.author.last_name,
            URL: post.author.URL,
            avatar_URL: post.author.avatar_URL,
            profile_URL: post.author.profile_URL,
          },
          date: post.date,
          modified: post.modified,
          title: post.title,
          URL: post.URL,
          excerpt: post.excerpt,
          featured_image: post.featured_image,
          liked: false,
          forLater: false,
        })),
      };
      return response;
    } catch (error) {
      throw new Error(error.message, " something went wrong");
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    toggleLiked: (state, action) => {
      const postItem = state.posts.find((post) => post.ID === action.payload);
      postItem.liked = !postItem.liked;
    },
    toggleForLater: (state, action) => {
      const postItem = state.posts.find((post) => post.ID === action.payload);
      postItem.forLater = !postItem.forLater;
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.offset += CHUNK_SIZE;
      state.posts = [...state.posts, ...action.payload.posts];
      state.counter = state.posts.length;
      state.isLoading = false;
    },
    [fetchPosts.rejected]: (state) => {
      state.isLoading = false;
    },

    [fetchAmountPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAmountPosts.fulfilled]: (state, action) => {
      state.foundPosts = action.payload.found;
    },
    [fetchAmountPosts.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { toggleLiked, toggleForLater } = postsSlice.actions;

export default postsSlice.reducer;
