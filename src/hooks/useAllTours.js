import { useState, useEffect } from "react";
import { DAV_APIS } from "../Adapter";

const useAllTours = (refresh = null) => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllTours = async () => {
    if (!navigator.onLine) {
      return;
    }

    if (tours.length > 0) {
      setTours(tours);
      return;
    }

    setIsLoading(true);
    const res = await DAV_APIS.get.getAllTours();
    if (res.status === 200) {
      setTours(res.data.tours);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllTours();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return { tours, isLoading };
};

export default useAllTours;
