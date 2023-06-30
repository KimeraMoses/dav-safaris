import { useEffect, useState } from "react";
import { DAV_APIS } from "../Adapter";

const usePosts = (type) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const res = await DAV_APIS.get.getAllPosts(type);
      if (res.status === 200) {
        setPosts(res.data.Posts);
      }
      setLoading(false);
    };
    getPosts();
  }, [type]);

  return { posts, loading };
};

export default usePosts;
