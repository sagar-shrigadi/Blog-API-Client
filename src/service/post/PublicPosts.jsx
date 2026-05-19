import { useEffect, useState } from "react";
import { baseUrl } from "../baseUrl";

export const usePublicPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch(`${baseUrl}/posts`);
        if (!response.ok) {
          throw Error(`Error: ${response.status}`);
        }
        const json = await response.json();
        console.log(`Json response log:`, json);
        setAllPosts(json.allPosts);
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
