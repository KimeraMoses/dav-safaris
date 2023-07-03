import { useState, useEffect } from "react";
import { DAV_APIS } from "../Adapter";

const useCategoryById = (categoryId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState({});
  const fetchCategory = async () => {
    setIsLoading(true);
    const res = await DAV_APIS.get.getCategoryById(categoryId);
    if (res.status === 200) {
      setCategory(res.data.tourCategory);
    }

    setIsLoading(false);
  };
  useEffect(() => {
    fetchCategory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);
  return { category, isLoading };
};
export default useCategoryById;
