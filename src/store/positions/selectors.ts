import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const positionsState = (state: RootState) => state.positions;

export const selectPositions = createSelector(
  positionsState,
  (state) => state.positions
);
