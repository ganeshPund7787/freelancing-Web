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
  },
});

export const { searchPost } = postSlice.actions;
export default postSlice.reducer;
