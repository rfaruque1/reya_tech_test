import { useCallback, useEffect, useRef, useState } from "react";

export interface UseWebSocketProps {
  url: string;
  quoteTokenIds: string[];
}

const constructSubscriptionMessage = (id: string) =>
  JSON.stringify({
    type: "subscribe",
    channel: "prices",
    id: `${id}USDMARK`,
  });

const useWebSocket = <T>({ url, quoteTokenIds }: UseWebSocketProps) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [data, setData] = useState<Record<string, T>>();
  const [error, setError] = useState<string | null>();

  const webSocketRefs = useRef<Map<string, WebSocket>>(new Map());

  const handleMessage = useCallback(
    (marketId: string, messageEvent: MessageEvent) => {
      try {
        const obtainedData: T = JSON.parse(messageEvent.data);
        setData((prevData) => {
          return {
            ...prevData,
            [marketId]: obtainedData,
          };
        });
      } catch {
        setError("Error occured when parsing WebSocket message");
      }
    },
    []
  );

  const sendMessage = useCallback((message: string, marketId: string) => {
    const webSocketInQuestion = webSocketRefs.current.get(marketId);
    if (
      webSocketInQuestion &&
      webSocketInQuestion.readyState === WebSocket.OPEN
    ) {
      webSocketInQuestion.send(message);
    } else {
      setError("WebSocket is not connected");
    }
  }, []);

  useEffect(() => {
    quoteTokenIds.forEach((marketId) => {
      const exisitingWebSocket = webSocketRefs.current.get(marketId);

      if (exisitingWebSocket) return;
      const webSocket = new WebSocket(url);

      webSocketRefs.current.set(marketId, webSocket);

      webSocket.onopen = () => {
        setIsConnected(true);

        sendMessage(constructSubscriptionMessage(marketId), marketId);
      };
      webSocket.onclose = () => setIsConnected(false);
      webSocket.onmessage = (event) => handleMessage(marketId, event);

      webSocket.onerror = () =>
        setError("Error occured on close of connection");

      return () => {
        webSocket.close();
        webSocketRefs.current.delete(marketId);
      };
    });
  }, [url, sendMessage, handleMessage, quoteTokenIds]);

  return { data, isConnected, error };
};

export { useWebSocket };
