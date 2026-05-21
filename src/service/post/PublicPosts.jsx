import { useEffect, useState } from "react";

export const usePublicPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/posts`,
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const json = await response.json();
        setAllPosts(json.allPosts.filter((post) => post.published));
      } catch (error) {
        console.error("Fetch All Posts Error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllPosts();
  }, []);
  return { allPosts, loading, error };
};
