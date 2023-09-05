import { useState, useEffect } from "react";
import { DAV_APIS } from "../Adapter";

const useAllCategories = (refresh = null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    if (!navigator.onLine) {
      return;
    }

    if (categories.length > 0 && !refresh) {
      setCategories(categories);
      return;
    }

    setIsLoading(true);
    const res = await DAV_APIS.get.getAllCategories();
    if (res.status === 200) {
      setCategories(res.data.categories);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);
  return { categories, isLoading };
};
export default useAllCategories;
