import { useCallback, useEffect, useState } from "react";

type HttpMethod = "GET" | "POST";

export interface UseFetchProps {
  url: string;
  method?: HttpMethod;
  autoFetch?: boolean;
}

const useFetch = <T>({ url, autoFetch = true }: UseFetchProps) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [path, setPath] = useState<string>();

  const buildUrl = useCallback(
    (url: string) => {
      if (url && !path) return url;

      return `${url}${path}`;
    },
    [path]
  );

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(buildUrl(url));

      if (!response.ok) {
        throw new Error("Error occured in fetching data");
      }

      const retrievedData: T = await response.json();

      setData(retrievedData);
    } catch (error) {
      setError((error as Error).toString());
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [buildUrl, url]);

  useEffect(() => {
    if (autoFetch || path) {
      fetchData();
    }
  }, [url, fetchData, autoFetch, path]);

  return {
    data,
    loading,
    error,
    setPath,
  };
};

export { useFetch };
