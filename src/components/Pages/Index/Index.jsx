import { useEffect, useState } from "react";
import { PostCard } from "../../PostCard/PostCard";

const usePublicPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts");
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
export const Index = () => {
  const { allPosts, loading, error } = usePublicPosts();
  if (loading)
    return (
      <section className="mx-auto">
        <h1 className="text-4xl">Loading...</h1>
      </section>
    );
  if (error)
    return (
      <section className="mx-auto">
        <h1 className="text-3xl text-center">
          Oops! Some error occured while fetching!
        </h1>
        <p className="text-2xl text-center">Please Restart the Page!</p>
      </section>
    );
  return (
    <section className="mx-auto flex flex-col gap-10 w-full py-1 px-2 lg:text-2xl lg:w-5xl lg:py-2.5">
      <h1 className="text-4xl mt-8">My Blogs</h1>
      <section className="grid gap-x-12 gap-y-8 lg:gap-y-16 grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))]">
        {allPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </section>
  );
};
