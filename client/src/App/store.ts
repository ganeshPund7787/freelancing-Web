import { configureStore } from "@reduxjs/toolkit";
import { civilUserSlice } from "../App/features/civilUser";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ClientSlice } from "./features/clientSlice";
import { ConversationSlice } from "./features/ConversationSlice";
import { postSlice } from "./features/postSlice";

export const store = configureStore({
  reducer: {
    user: civilUserSlice.reducer,
    client: ClientSlice.reducer,
    conversation: ConversationSlice.reducer,
    post: postSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;

export const useAppSelectore: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
