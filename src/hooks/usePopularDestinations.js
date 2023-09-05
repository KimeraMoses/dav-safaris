import { useState, useEffect } from "react";
import { DAV_APIS } from "../Adapter";

const usePopularDestinations = () => {
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPopularDestinations = async () => {
    if (!navigator.onLine) {
      return;
    }

    if (popularDestinations.length > 0) {
      setPopularDestinations(popularDestinations);
      return;
    }

    setIsLoading(true);
    const res = await DAV_APIS.get.getPopularDestinations();
    if (res.status === 200) {
      setPopularDestinations(res.data.popularCountries);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getPopularDestinations();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { popularDestinations, isLoading };
};
export default usePopularDestinations;
