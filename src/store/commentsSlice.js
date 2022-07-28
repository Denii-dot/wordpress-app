import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request, ENDPOINTS, CHUNK_SIZE } from "../helpers/axios";

const initialState = {
  comments: [],
  isLoading: false,
  number: CHUNK_SIZE,
  counter: 0,
  offset: 0,
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (param1, thunkAPI) => {
    try {
      const { number, offset } = thunkAPI.getState().comments;
      const params = { number, offset };
      let response = (await request.get(ENDPOINTS.COMMENTS, { params })).data;
      response = {
        comments: response.comments.map((comment) => ({
          id: comment.ID,
          post: {
            id: comment.post.ID,
            title: comment.post.title,
            linke: comment.post.link,
          },
          author: {
            id: comment.author.ID,
            name: comment.author.name,
            avatar: comment.author.avatar_URL,
          },
          date: comment.date,
          content: comment.content,
          liked: false,
          forLater: false,
        })),
      };
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    toggleLiked: (state, action) => {
      const commentItem = state.comments.find(
        (comment) => comment.id === action.payload
      );
      commentItem.liked = !commentItem.liked;
    },
    toggleForLater: (state, action) => {
      const commentItem = state.comments.find(
        (comment) => comment.id === action.payload
      );
      commentItem.forLater = !commentItem.forLater;
    },
  },
  extraReducers: {
    [fetchComments.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments = [...state.comments, ...action.payload.comments];
      state.offset += state.number;
      state.counter = state.comments.length;
      state.isLoading = false;
    },
    [fetchComments.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { toggleLiked, toggleForLater } = commentsSlice.actions;

export default commentsSlice.reducer;
