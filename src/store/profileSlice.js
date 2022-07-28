import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
  trendsLiked: [],
  trendsForLater: [],
  taxonomyLiked: [],
  taxonomyForLater: [],
  postsLiked: [],
  postsForLater: [],
  commentsLiked: [],
  commentsForLater: [],
  isLoading: false,
};

export const showLikedPosts = createAsyncThunk(
  "profile/showLikedPosts",
  async (param1, thunkAPI) => {
    try {
      const { posts } = thunkAPI.getState().posts;
      const newArray = [...posts].filter((post) => post.liked);
      return newArray;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

export const showForLaterPosts = createAsyncThunk(
  "profile/showForLaterPosts",
  async (param1, thunkAPI) => {
    try {
      const { posts } = thunkAPI.getState().posts;
      const newArray = [...posts].filter((post) => post.forLater);
      return newArray;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);
export const showLikedComments = createAsyncThunk(
  "profile/showLikedComments",
  async (param1, thunkAPI) => {
    try {
      const { comments } = thunkAPI.getState().comments;
      const newArray = [...comments].filter((comment) => comment.liked);
      return newArray;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

export const showForLaterComments = createAsyncThunk(
  "profile/showForLaterComments",
  async (param1, thunkAPI) => {
    try {
      const { comments } = thunkAPI.getState().comments;
      const newArray = [...comments].filter((comment) => comment.forLater);
      return newArray;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);
export const showLikedTaxonomy = createAsyncThunk(
  "profile/showLikedTaxonomy",
  async (param1, thunkAPI) => {
    try {
      const { categories } = thunkAPI.getState().taxonomy;
      const newArray = [...categories].filter((category) => category.liked);
      return newArray;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

export const showForLaterTaxonomy = createAsyncThunk(
  "profile/showForLaterTaxonomy",
  async (param1, thunkAPI) => {
    try {
      const { categories } = thunkAPI.getState().taxonomy;
      const newArray = [...categories].filter((category) => category.forLater);
      return newArray;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);
export const showLikedTrends = createAsyncThunk(
  "profile/showLikedTrends",
  async (param1, thunkAPI) => {
    try {
      const { trends } = thunkAPI.getState().trends;
      const newArray = [...trends].filter((trend) => trend.liked);
      return newArray;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

export const showForLaterTrends = createAsyncThunk(
  "profile/showForLaterTrends",
  async (param1, thunkAPI) => {
    try {
      const { trends } = thunkAPI.getState().trends;
      const newArray = [...trends].filter((trend) => trend.forLater);
      return newArray;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: {
    // POSTS
    [showLikedPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [showLikedPosts.fulfilled]: (state, action) => {
      state.postsLiked = [...action.payload];
      state.isLoading = false;
    },
    [showLikedPosts.rejected]: (state) => {
      state.isLoading = false;
    },
    [showForLaterPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [showForLaterPosts.fulfilled]: (state, action) => {
      state.postsForLater = [...action.payload];
      state.isLoading = false;
    },
    [showForLaterPosts.rejected]: (state) => {
      state.isLoading = false;
    },
    // COMMENTS
    [showLikedComments.pending]: (state) => {
      state.isLoading = true;
    },
    [showLikedComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.commentsLiked = [...action.payload];
    },
    [showLikedComments.rejected]: (state) => {
      state.isLoading = false;
    },
    [showForLaterComments.pending]: (state) => {
      state.isLoading = true;
    },
    [showForLaterComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.commentsForLater = [...action.payload];
    },
    [showForLaterComments.rejected]: (state) => {
      state.isLoading = false;
    },
    // Taxonomy
    [showLikedTaxonomy.pending]: (state) => {
      state.isLoading = true;
    },
    [showLikedTaxonomy.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.taxonomyLiked = [...action.payload];
    },
    [showLikedTaxonomy.rejected]: (state) => {
      state.isLoading = false;
    },
    [showForLaterTaxonomy.pending]: (state) => {
      state.isLoading = true;
    },
    [showForLaterTaxonomy.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.taxonomyForLater = [...action.payload];
    },
    [showForLaterTaxonomy.rejected]: (state) => {
      state.isLoading = false;
    },
    // TRENDS
    [showLikedTrends.pending]: (state) => {
      state.isLoading = true;
    },
    [showLikedTrends.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.trendsLiked = [...action.payload];
    },
    [showLikedTrends.rejected]: (state) => {
      state.isLoading = false;
    },
    [showForLaterTrends.pending]: (state) => {
      state.isLoading = true;
    },
    [showForLaterTrends.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.trendsForLater = [...action.payload];
    },
    [showForLaterTrends.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default profileSlice.reducer;
