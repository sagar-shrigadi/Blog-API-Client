import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { DateOptions } from "../../PostCard/DateOptions";
import { FetchLoading } from "../../FetchLoading/FetchLoading";
import { FetchError } from "../../FetchError/FetchError";
import { BackBtn } from "../../BackBtn/BackBtn";
import { CommentCard } from "../../CommentCard/CommentCard";

const usePostById = (postId) => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`);
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
  }, [postId]);
  return { post, loading, error };
};

export const Post = () => {
  const { postId } = useParams();
  const { post, error, loading } = usePostById(postId);

  if (loading) return <FetchLoading />;
  if (error) return <FetchError />;

  return (
    <section className="grow mx-auto mt-8 flex flex-col justify-start w-full min-h-1/2 py-1 px-3 lg:text-2xl lg:w-5xl lg:py-2.5">
      <BackBtn />
      <p className="self-end mb-4">
        {new Date(post.createdAt).toLocaleDateString("en-GB", DateOptions)}
      </p>
      <h1 className="text-4xl text-balance mb-6">{post.title}</h1>
      <p className="text-lg text-pretty">{post.content}</p>

      <div className="comments">
        <h2 className="text-4xl text-balance mt-10 mb-4 pb-4 border-b-2">
          Comments
        </h2>
        {post.comments.map((comment) => {
          <CommentCard key={comment.id} comment={comment} />;
        })}
      </div>
    </section>
  );
};
