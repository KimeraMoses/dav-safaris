import { useEffect, useState } from "react";
import { DAV_APIS } from "../Adapter";
const useCategoryBySlug = (slug) => {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState({});
  const fetchCategoryBySlug = async () => {
    setIsLoading(true);
    const res = await DAV_APIS.get.getCategoryBySlug(slug);
    if (res.status === 200) {
      setCategory(res.data.category);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchCategoryBySlug();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  return { category, isLoading };
};
export default useCategoryBySlug;
