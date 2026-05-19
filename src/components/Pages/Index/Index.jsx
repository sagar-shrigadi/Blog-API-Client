import { PostCard } from "../../PostCard/PostCard";
import { Link } from "react-router";
import { FetchLoading } from "../../FetchLoading/FetchLoading";
import { FetchError } from "../../FetchError/FetchError";
import { usePublicPosts } from "../../../service/post/PublicPosts";

export const Index = () => {
  const { allPosts, loading, error } = usePublicPosts();
  if (loading) return <FetchLoading />;
  if (error) return <FetchError />;
  return (
    <section className="grow mx-auto mt-8 flex flex-col gap-10 w-full py-1 px-2 lg:text-2xl lg:w-5xl lg:py-2.5">
      <h1 className="text-4xl text-balance">My Blogs</h1>
      <section className="grid gap-x-12 gap-y-8 lg:gap-y-16 grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))]">
        {allPosts.length > 0 ? (
          allPosts.map((post) => (
            <Link to={`posts/${post.id}`} key={post.id}>
              <PostCard post={post} />
            </Link>
          ))
        ) : (
          <div className="grid place-items-center min-h-25 text-xl">
            <p className="italic">No posts yet</p>
          </div>
        )}
        {}
      </section>
    </section>
  );
};
