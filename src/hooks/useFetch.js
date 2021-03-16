import axios from "axios";
import { useState, useEffect, useCallback } from "react";

const useFetch = (url) => {
  const baseUrl =
    "https://my-json-server.typicode.com/StanleySB/test-json-server";
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    axios(baseUrl + url, options)
      .then((res) => {
        setIsLoading(false);
        setResponse(res);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response);
      });
  }, [isLoading, options, url]);
  return [
    {
      isLoading,
      response,
      error,
    },
    doFetch,
  ];
};

export default useFetch;
