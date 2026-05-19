import { useEffect, useState } from "react";
import { baseUrl } from "../baseUrl";

export const usePostById = (postId, refreshTrigger) => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const response = await fetch(`${baseUrl}/posts/${postId}`);
        if (!response.ok) {
          throw Error(`Error: ${response.status}`);
        }
        const json = await response.json();
        console.log("Selected Post", json);
        setPost(json.selectPost);
      } catch (error) {
        console.error("Fetch Post By Id Error: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPostById();
  }, [postId, refreshTrigger]);
  return { post, loading, error };
};
