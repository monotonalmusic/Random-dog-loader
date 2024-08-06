import { useState, useEffect, useCallback } from "react";

const useFetch = () => {
  const [dogURL, setDogURL] = useState(null);
  const [error, setError] = useState(null);

  const fetchDog = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch("https://random.dog/woof.json");
      const data = await response.json();
      console.log(data)
      setDogURL(data.url);
    } catch (error) {
      setError("Failed to fetch dog image");
    }
  }, []);

  useEffect(() => {
    fetchDog();
  }, [fetchDog]);

  return { dogURL, error, fetchDog };
};

export default useFetch;
