import { useEffect, useState } from "react";

const useShopAPI = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=25")
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);
  return { data, error, loading };
};

export default useShopAPI;
