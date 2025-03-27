import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const UserState = (state: RootState) => state.user;

export const selectUserWalletAddress = createSelector(
  UserState,
  (state) => state.walletAddress
);
