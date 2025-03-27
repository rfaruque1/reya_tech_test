import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInitialState {
  walletAddress: string;
}

export const initialState: UserInitialState = {
  walletAddress: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addWalletAddress(state, { payload }: PayloadAction<string>) {
      state.walletAddress = payload;
    },
  },
});

export const { addWalletAddress } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
