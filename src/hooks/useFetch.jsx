import { useState, useEffect, useCallback } from "react";

const useFetch = () => {
  const [dogURL, setDogURL] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDog = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch("https://random.dog/woof.json");
      const data = await response.json();
      console.log(data);
      setDogURL(data.url);
    } catch (error) {
      setError("Failed to fetch dog image:", error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDog();
  }, [fetchDog]);

  return { dogURL, error, isLoading, fetchDog };
};

export default useFetch;
