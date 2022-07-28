import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import commentsReducer from "./commentsSlice";
import trendsReducer from "./trendsSlice";
import taxonomyReducer from "./taxonomySlice";
import profileSlice from "./profileSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    trends: trendsReducer,
    taxonomy: taxonomyReducer,
    profile: profileSlice,
  },
});
