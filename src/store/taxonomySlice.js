import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request, ENDPOINTS, CHUNK_SIZE } from "../helpers/axios";

const initialState = {
  found: 0,
  categories: [],
  isLoading: false,
  number: CHUNK_SIZE,
  offset: 0,
  counter: 0,
};

export const fetchTaxonomy = createAsyncThunk(
  "taxonomy/fetchTaxonomy",
  async (params1, thunkAPI) => {
    try {
      const { number, offset } = thunkAPI.getState().taxonomy;
      const params = { number, offset };
      let response = (await request(ENDPOINTS.TAXONOMY, { params })).data;
      response = {
        found: response.found,
        categories: response.categories.map((category) => ({
          id: category.ID,
          name: category.name,
          count: category.post_count,
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

const taxonomySlice = createSlice({
  name: "taxonomy",
  initialState,
  reducers: {
    toggleLiked: (state, action) => {
      const categoryItem = state.categories.find(
        (category) => category.id === action.payload
      );
      categoryItem.liked = !categoryItem.liked;
    },
    toggleForLater: (state, action) => {
      const categoryItem = state.categories.find(
        (category) => category.id === action.payload
      );
      categoryItem.forLater = !categoryItem.forLater;
    },
  },
  extraReducers: {
    [fetchTaxonomy.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchTaxonomy.fulfilled]: (state, action) => {
      state.found = action.payload.found;
      state.categories = [...state.categories, ...action.payload.categories];
      state.offset += state.number;
      state.counter = state.categories.length;
      state.isLoading = false;
    },
    [fetchTaxonomy.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { toggleLiked, toggleForLater } = taxonomySlice.actions;

export default taxonomySlice.reducer;
