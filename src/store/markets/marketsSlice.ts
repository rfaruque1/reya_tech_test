import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MarketData {
  id: number;
  quoteToken: string;
}

export interface InitialState {
  markets: MarketData[];
}

const initialState: InitialState = {
  markets: [],
};

export const marketsSlice = createSlice({
  name: "markets",
  initialState,
  reducers: {
    addMarket(state, { payload }: PayloadAction<MarketData>) {
      state.markets.push(payload);
    },
  },
});

export const marketsSliceReducer = marketsSlice.reducer;

export const { addMarket } = marketsSlice.actions;
