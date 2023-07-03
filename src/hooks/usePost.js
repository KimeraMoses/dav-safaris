import { useEffect, useState } from "react";
import { DAV_APIS } from "../Adapter";

const usePost = (postName, type) => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      const res = await DAV_APIS.get.getPostByName(postName, type);
      if (res.status === 200) {
        setPost(res.data.post);
      }
      setLoading(false);
    };
    getPost();
  }, [postName, type]);

  return { post, loading };
};

export default usePost;
