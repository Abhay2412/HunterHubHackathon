import { useEffect, useState } from "react";

const useFetchData = (url, postData) => {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState("");
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData),
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const resultData = await response.json();
          setResult(resultData.response || resultData.reply);
        } catch (error) {
          setError(error.message);
          console.error("Error:", error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [url, JSON.stringify(postData)]);
  
    return { loading, result, error };
  };
  
  export default useFetchData;