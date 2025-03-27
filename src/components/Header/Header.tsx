import { useEffect, useState } from "react";
import { Button } from "../../UI/Button/Button";
import { Input } from "../../UI/Input/Input";
import { useFetch } from "../../hooks/useFetch";
import {
  addPosition,
  PositionData,
} from "../../store/positions/positionsSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Header.module.scss";

import icon from "../../assets/icons/Reya.svg";
import { selectMarkets } from "../../store/markets/selectors";

export interface WalletFetchResponse {
  id: string;
  name: string;
  positions: PositionData[];
}

export const Header = () => {
  const dispatch = useDispatch();
  const marketsData = useSelector(selectMarkets);

  const [walletAddressInput, setWalletAddressInput] = useState("");
  const [currentWalletAddress, setCurrentWalletAddress] = useState("");

  const { data: walletData, setPath } = useFetch<WalletFetchResponse[]>({
    url: "https://api.reya.xyz/api/accounts/",
    autoFetch: false,
  });

  useEffect(() => {
    if (walletData) {
      const filteredListWithPositions = walletData.filter(
        (data) => data.positions.length
      );

      filteredListWithPositions?.forEach(({ positions }) => {
        positions.forEach(({ size, base, markPrice, id, marketId }) => {
          const positionToAdd: PositionData = {
            id,
            marketId,
            size,
            base,
            markPrice,
            quoteToken: marketsData.find(({ id }) => id === marketId)
              ?.quoteToken,
          };

          dispatch(addPosition(positionToAdd));
        });
      });
    }
  }, [dispatch, marketsData, walletAddressInput, walletData]);

  const onClickHandler = () => {
    setPath(walletAddressInput);
    setCurrentWalletAddress(walletAddressInput);
    setWalletAddressInput("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={icon} />
      </div>
      <p className={styles.title}>Portfolio</p>

      <div className={styles.inputGroup}>
        <Input
          classNames={styles.input}
          onChange={(value) => setWalletAddressInput(value)}
          placeholder="Enter wallet address"
          value={walletAddressInput}
        />
        <Button label="Find Wallet" onClick={onClickHandler} />
      </div>

      {currentWalletAddress && (
        <span className={styles.currentWalletAddress}>
          <p className={styles.currentWalletAddress_value}>
            {currentWalletAddress}
          </p>
        </span>
      )}
    </div>
  );
};
