import { useLocation } from "react-router-dom";

const useSearchQuery = (query) => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const q = useQuery();

  return q.get(query);
};

export default useSearchQuery;
