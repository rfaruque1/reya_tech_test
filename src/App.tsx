import { useEffect } from "react";
import { useFetch } from "./hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { addMarket, MarketData } from "./store/markets/marketsSlice";
import { PositionsViewer } from "./components/PositionsViewer/PositionsViewer";
import { Header } from "./components/Header/Header";
import { Sidebar } from "./components/Sidebar/Sidebar";
import styles from "./App.module.scss";
import { selectPositions } from "./store/positions/selectors";

export interface MarketDataResponse {
  id: number;
  quoteToken: string;
}

function App() {
  const dispatch = useDispatch();
  const positions = useSelector(selectPositions);

  const { data: marketData } = useFetch<MarketDataResponse[]>({
    url: "https://api.reya.xyz/api/markets",
  });

  useEffect(() => {
    if (marketData) {
      marketData.map(({ id, quoteToken }) => {
        const marketDataToAdd: MarketData = { id, quoteToken };
        dispatch(addMarket(marketDataToAdd));
      });
    }
  }, [dispatch, marketData]);

  return (
    <div className={styles.container}>
      <Header />

      {positions.length > 0 ? (
        <div className={styles.dashboard}>
          <Sidebar classNames={styles.sidebar} />
          <PositionsViewer classNames={styles.positionsViewer} />
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <span>Please enter a wallet address to retrieve data</span>
        </div>
      )}
    </div>
  );
}

export default App;
