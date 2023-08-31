import { useState, useEffect } from 'react';
import { DAV_APIS } from '../Adapter';

const useCountryTours = (country, refresh) => {
  const [countryTours, setCountryTours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCountryTours = async () => {
    if (!country) return;
    setIsLoading(true);
    const res = await DAV_APIS.get.getAllToursByCountry(country);
    if (res.status === 200) {
      setCountryTours(res.data.tours);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCountryTours();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, refresh]);

  return { countryTours, isLoading };
};

export default useCountryTours;
