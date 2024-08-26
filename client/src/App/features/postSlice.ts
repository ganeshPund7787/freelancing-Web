import { JobPostType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PostSliceState {
  SeacrhedPost: JobPostType[];
}

const initialState: PostSliceState = {
  SeacrhedPost: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    searchPost: (state, action: PayloadAction<JobPostType[] | []>) => {
      state.SeacrhedPost = action.payload;
    },
    SearchPostEmty: (state) => {
      state.SeacrhedPost = [];
    },
  },
});

export const { searchPost, SearchPostEmty } = postSlice.actions;
export default postSlice.reducer;
