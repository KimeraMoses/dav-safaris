import { useEffect } from 'react';
import { useState } from 'react';
import { DAV_APIS } from '../Adapter';

const useTourReviews = (tourId, refresh) => {
  const [reviews, setReviews] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReview = async () => {
    if (!tourId) return;
    setIsLoading(true);
    const res = await DAV_APIS.get.getTourReviews(tourId);
    if (res.status === 200) {
      setReviews(res.data.reviews);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchReview();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourId, refresh]);

  return { reviews, isLoading };
};

export default useTourReviews;
