export interface PositionViewerProps {
  classNames?: string;
}

export type ChannelType = "channel_data" | "connected";

export interface UpdatedMarketPriceData {
  contents?: { spotPrice: number };
  type?: ChannelType;
}

export interface WebSocketResponse {
  [marketId: string]: UpdatedMarketPriceData;
}
