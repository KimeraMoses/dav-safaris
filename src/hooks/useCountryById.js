import { useEffect, useState } from 'react';
import { DAV_APIS } from '../Adapter';

const useCountryById = (countryId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState({});
  const fetchCountryById = async () => {
    if (!countryId) return;
    setIsLoading(true);
    const res = await DAV_APIS.get.getCountryById(countryId);
    if (res.status === 200) {
      setCountry(res.data.country);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchCountryById();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId]);
  return { country, isLoading };
};
export default useCountryById;
