import { useState, useEffect } from "react";
import { DAV_APIS } from "../Adapter";

const useAllTours = () => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllTours = async () => {
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
  }, []);

  return { tours, isLoading };
};

export default useAllTours;
