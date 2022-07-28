import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request, ENDPOINTS } from "../helpers/axios";

export const fetchTrends = createAsyncThunk("trends/fetchTrends", async () => {
  try {
    let response = (await request.get(ENDPOINTS.TRENDS)).data;
    response = {
      tags: response.tags.map((trend) => ({
        tag: {
          title: trend.tag.title,
          url: trend.tag.URL,
        },
        liked: false,
        forLater: false,
        id: parseInt(trend.tag.ID),
        count: trend.count,
      })),
    };
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
});

const initialState = {
  trends: [],
  count: 0,
  isLoading: false,
};

const trendsSlice = createSlice({
  name: "trends",
  initialState,
  reducers: {
    toggleLiked: (state, action) => {
      const trendItem = state.trends.find(
        (trend) => trend.id === action.payload
      );
      trendItem.liked = !trendItem.liked;
    },
    toggleForLater: (state, action) => {
      const trendItem = state.trends.find(
        (trend) => trend.id === action.payload
      );
      trendItem.forLater = !trendItem.forLater;
    },
  },
  extraReducers: {
    [fetchTrends.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchTrends.fulfilled]: (state, action) => {
      state.trends = [...state.trends, ...action.payload.tags];
      state.count = state.trends.length;
      state.isLoading = false;
    },
    [fetchTrends.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { toggleLiked, toggleForLater } = trendsSlice.actions;

export default trendsSlice.reducer;
