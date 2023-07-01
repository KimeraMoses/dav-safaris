import { useState, useEffect } from "react";
import { DAV_APIS } from "../Adapter";

const useAllCategories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    setIsLoading(true);
    const res = await DAV_APIS.get.getAllCategories();
    if (res.status === 200) {
      setCategories(res.data.categories);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return { categories, isLoading };
};
export default useAllCategories;
