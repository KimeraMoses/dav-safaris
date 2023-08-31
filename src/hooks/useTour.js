import { useEffect } from 'react';
import { useState } from 'react';
import { DAV_APIS } from '../Adapter';

const useTour = (tourName) => {
  const [tour, setTour] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTour = async () => {
    if (!tourName) return;
    setIsLoading(true);
    const res = await DAV_APIS.get.getTourByName(tourName);
    if (res.status === 200) {
      setTour(res.data.tour);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchTour();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourName]);

  return { tour, isLoading };
};

export default useTour;
