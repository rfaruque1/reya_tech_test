import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const MarketsState = (state: RootState) => state.markets;

export const selectMarkets = createSelector(
  MarketsState,
  (state) => state.markets
);
