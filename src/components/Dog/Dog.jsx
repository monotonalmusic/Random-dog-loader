import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import styles from "./dog.module.css";

const LoadDog = () => {
  const { dogURL, error, fetchDog } = useFetch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dogURL) {
      setLoading(true);
      console.log("SetLoading: True");

      // Check if the dogURL ends with .mp4
      if (dogURL.endsWith(".mp4")) {
        console.log("Dog URL is a video, fetching a new dog...");
        fetchDog();
      }
    }
  }, [dogURL]);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setTimeout(() => {
        if (loading) {
          console.log("Loading for more than 3 seconds, fetching new dog...");
          fetchDog();
        }
      }, 3000);
    } else {
      console.log("Clearing Timeout");
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [loading]);

  const handleImageLoad = () => {
    setLoading(false);
    console.log("SetLoading: False");
  };

  const dogButton = () => {
    setLoading(true);
    fetchDog();
  };

  return (
    <div className={styles.bigDiv}>
      <div className={styles.upperDiv}>
        <h1>See a random dog!</h1>
        <button onClick={dogButton} className={styles.dogButton}>
          NEW DOG
        </button>
      </div>

      <div className={styles.lowerDiv}>
        {error && <p>{error}</p>}
        {loading && <div className={styles.loadingSpinner}></div>}
        {dogURL && !dogURL.endsWith(".mp4") && (
          <img
            src={dogURL}
            className={styles.dogImage}
            alt="A Random Dog"
            onLoad={handleImageLoad}
            style={{ display: loading ? "none" : "block" }}
          />
        )}
      </div>
    </div>
  );
};

export default LoadDog;
