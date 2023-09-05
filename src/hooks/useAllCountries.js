import { useEffect, useState } from "react";
import { DAV_APIS } from "../Adapter";

const useAllCountries = (refresh = null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const fetchAllCountries = async () => {
    if (!navigator.onLine) {
      return;
    }

    if (countries.length > 0 && !refresh) {
      setCountries(countries);
      return;
    }

    setIsLoading(true);
    const res = await DAV_APIS.get.getAllCountries();
    if (res.status === 200) {
      setCountries(res.data.countries);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchAllCountries();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);
  return { countries, isLoading };
};
export default useAllCountries;
