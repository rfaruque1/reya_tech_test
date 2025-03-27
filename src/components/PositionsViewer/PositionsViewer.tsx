import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { selectPositions } from "../../store/positions/selectors";
import clsx from "clsx";

import styles from "./PositionsViewer.module.scss";
import { useWebSocket } from "../../hooks/useWebSocket";
import { updatePositionPrice } from "../../store/positions/positionsSlice";
import {
  PositionViewerProps,
  UpdatedMarketPriceData,
  WebSocketResponse,
} from "./types";

export const PositionsViewer = ({ classNames }: PositionViewerProps) => {
  const dispatch = useDispatch();
  const positionsData = useSelector(selectPositions);

  const quoteTokenIds = positionsData.map(
    (position) => position.quoteToken
  ) as string[];

  const { data: updatedMarketPriceData } = useWebSocket<WebSocketResponse>({
    url: "wss://websocket.reya.xyz",
    quoteTokenIds,
  });

  console.log("websocket data: ", updatedMarketPriceData);

  useEffect(() => {
    if (updatedMarketPriceData) {
      positionsData.forEach(({ quoteToken, id }) => {
        if (quoteToken) {
          const marketPriceInQuestion = updatedMarketPriceData[
            quoteToken
          ] as UpdatedMarketPriceData;

          if (
            marketPriceInQuestion &&
            marketPriceInQuestion.type === "channel_data"
          ) {
            dispatch(
              updatePositionPrice({
                id,
                newPrice: Number(marketPriceInQuestion.contents?.spotPrice),
              })
            );
          }
        }
      });
    }
  }, [dispatch, positionsData, updatedMarketPriceData]);

  return (
    <div className={clsx(styles.container, classNames)}>
      <p className={styles.title}>Positions</p>
      <div className={styles.table}>
        <span className={styles.tableHeaders}>Market</span>
        <span className={styles.tableHeaders}>Size</span>
        <span className={styles.tableHeaders}>Position Value</span>
        <span className={styles.tableHeaders}>Mark Price</span>

        {positionsData.map(({ id, size, base, markPrice, quoteToken }) => {
          return (
            <React.Fragment key={id}>
              <span>{quoteToken}</span>
              <span>{size.toFixed(2)}</span>
              <span>{base}</span>
              <span>{markPrice.toFixed(2)}</span>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
