import { configureStore } from "@reduxjs/toolkit";
import { marketsSliceReducer } from "./markets/marketsSlice";
import { positionsReducer } from "./positions/positionsSlice";
import { userSliceReducer } from "./user/userSlice";

export const store = configureStore({
  reducer: {
    markets: marketsSliceReducer,
    positions: positionsReducer,
    user: userSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
