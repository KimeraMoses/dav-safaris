import { useState, useEffect } from 'react';
import { DAV_APIS } from '../Adapter';

const useCountry = (slug) => {
  const [country, setCountry] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const fetchCountry = async () => {
    if (!slug) return;
    setIsLoading(true);
    const res = await DAV_APIS.get.getCountryBySlug(slug);
    if (res.status === 200) {
      setCountry(res.data.country);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchCountry();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  return { country, isLoading };
};
export default useCountry;
