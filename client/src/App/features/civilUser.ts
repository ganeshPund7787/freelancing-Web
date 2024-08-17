import { CivilUserType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PersonState {
  CurrentCivilUser: CivilUserType | any;
  loading: boolean;
  isAddProject: boolean;
}

const initialState: PersonState = {
  CurrentCivilUser: sessionStorage.getItem("CurrentCivilUser")
    ? JSON.parse(sessionStorage.getItem("CurrentCivilUser") as string)
    : null,
  loading: false,
  isAddProject: false,
};

export const civilUserSlice = createSlice({
  name: "civilUser",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchFail: (state) => {
      state.loading = false;
    },
    fetchSuccess: (state, action: PayloadAction<CivilUserType>) => {
      state.loading = false;
      state.CurrentCivilUser = action.payload;
      sessionStorage.setItem(
        "CurrentCivilUser",
        JSON.stringify(action.payload)
      );
    },
    updateFail: (state) => {
      state.loading = false;
    },
    updateSuccess: (state, action: PayloadAction<CivilUserType>) => {
      state.loading = false;
      state.CurrentCivilUser = action.payload;
      sessionStorage.setItem(
        "CurrentCivilUser",
        JSON.stringify(action.payload)
      );
    },
    startAddProject: (state) => {
      state.isAddProject = true;
    },
    successAddProject: (state) => {
      state.isAddProject = false;
    },
    logOutuser: (state) => {
      state.loading = false;
      state.CurrentCivilUser = null;
      sessionStorage.clear();
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  fetchSuccess,
  updateFail,
  updateSuccess,
  startAddProject,
  successAddProject,
  logOutuser,
} = civilUserSlice.actions;
export default civilUserSlice.reducer;
