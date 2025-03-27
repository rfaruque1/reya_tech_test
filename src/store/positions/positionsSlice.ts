import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PositionData {
  id: number;
  marketId: number;
  size: number;
  base: number;
  markPrice: number;
  quoteToken?: string;
}

export interface InitialState {
  positions: PositionData[];
}

const initialState: InitialState = {
  positions: [],
};

export interface UpdatePositionData extends PositionData {
  newMarkPrice: number;
}

export const positionsSlice = createSlice({
  name: "positions",
  initialState: initialState,
  reducers: {
    addPosition(state, { payload }: PayloadAction<PositionData>) {
      if (!state.positions.find(({ id }) => id === payload.id)) {
        state.positions.push(payload);
      }
    },
    updatePositionPrice(
      state,
      { payload }: PayloadAction<{ id: number; newPrice: number }>
    ) {
      const position = state.positions.find(({ id }) => id === payload.id);

      if (position) {
        position.markPrice = payload.newPrice;
      }
    },
  },
});

export const { addPosition, updatePositionPrice } = positionsSlice.actions;

export const positionsReducer = positionsSlice.reducer;
