import { useState, useEffect } from "react";
import triggerToast from "../shared/UIelemets/Toast";

export const useFetchProducts = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          triggerToast(
            "error",
            errorData.message || "Network response was not ok"
          );
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [url]);

  return { data, error };
};
