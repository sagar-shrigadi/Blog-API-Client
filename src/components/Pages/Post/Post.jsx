import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router";
import { DateOptions } from "../../PostCard/DateOptions";
import { FetchLoading } from "../../FetchLoading/FetchLoading";
import { FetchError } from "../../FetchError/FetchError";
import { BackBtn } from "../../BackBtn/BackBtn";
import { CommentCard } from "../../CommentCard/CommentCard";
import { DivWrapper } from "../../Forms/DivWrapper";

const usePostById = (postId, refreshTrigger) => {
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
  }, [postId, refreshTrigger]);
  return { post, loading, error };
};

async function postComment(token, postId, message) {
  console.log("post id before sending post comments request", postId);
  console.log("Message body before sending post comments request", message);
  try {
    const response = await fetch(
      `http://localhost:3000/posts/${postId}/comments`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      },
    );
    console.log("response from server", response);
    const data = await response.json();
    console.log("response after converting to json", data);

    if (!response.ok) {
      console.log("response error", data.msg);
      throw Error(`${data.msg}`);
    } else {
      console.log("Post Comment response", data);
      return data;
    }
  } catch (error) {
    console.error("Post Comment", error);
  }
}

export const Post = () => {
  const { postId } = useParams();
  const [refreshToggle, setRefreshToggle] = useState(false);
  const { post, error, loading } = usePostById(postId, refreshToggle);
  const { token } = useOutletContext();
  const [message, setMessage] = useState();
  let navigate = useNavigate();
  const location = useLocation();

  const commentHandleSubmit = async (e) => {
    e.preventDefault();
    console.log("User token", token);
    if (!token) {
      navigate("/login", {
        replace: true,
        state: { from: location.pathname },
      });
    } else {
      try {
        const response = await postComment(token, postId, message);
        console.log(response);
        setRefreshToggle((prev) => !prev);
        setMessage("");
        const popoverTarget = document.getElementById("addCommentForm");
        if (popoverTarget) {
          popoverTarget.hidePopover();
        }
      } catch (error) {
        console.error("New Comment Submision Error", error);
      }
    }
  };
  const popoverHandleClose = () => {
    setMessage(""); // Clears input if user cancels/closes without submitting
  };

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
        <div className="flex justify-between items-center mt-10 mb-8 border-b-2">
          <h2 className="text-3xl lg:text-4xl text-balance pb-2">
            {post.comments.length > 0
              ? `${post.comments.length} Comments`
              : `Comments`}
          </h2>
          <button
            popoverTarget="addCommentForm"
            popoverTargetAction="show"
            className="flex items-center justify-between gap-2 text-lg border px-2 cursor-pointer rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              className="w-5"
            >
              {/* !Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc. */}
              <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
            </svg>
            Add{" "}
          </button>
          <div
            popover="auto"
            id="addCommentForm"
            className="m-auto min-h-1/3 bg-gray-300 px-8 py-6  rounded-2xl"
          >
            <div className="flex flex-col justify-between items-center gap-2">
              <button
                popoverTarget="addCommentForm"
                popoverTargetAction="hide"
                onClick={popoverHandleClose}
                className="self-end cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-7"
                >
                  {/* !Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc. */}
                  <path d="M504.6 148.5C515.9 134.9 514.1 114.7 500.5 103.4C486.9 92.1 466.7 93.9 455.4 107.5L320 270L184.6 107.5C173.3 93.9 153.1 92.1 139.5 103.4C125.9 114.7 124.1 134.9 135.4 148.5L278.3 320L135.4 491.5C124.1 505.1 125.9 525.3 139.5 536.6C153.1 547.9 173.3 546.1 184.6 532.5L320 370L455.4 532.5C466.7 546.1 486.9 547.9 500.5 536.6C514.1 525.3 515.9 505.1 504.6 491.5L361.7 320L504.6 148.5z" />
                </svg>
              </button>
              <h2 className="text-2xl self-start mb-3">Add Comment</h2>
            </div>
            <form
              className="grow flex flex-col justify-between gap-8"
              onSubmit={commentHandleSubmit}
            >
              <DivWrapper>
                <textarea
                  name="message"
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border rounded-md text-base p-2"
                  rows="5"
                  autoFocus
                ></textarea>
              </DivWrapper>
              <button
                type="submit"
                className="border p-1 rounded text-xl cursor-pointer mb-2"
              >
                Add
              </button>
            </form>
          </div>
        </div>
        <section className="flex flex-col gap-6">
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))
          ) : (
            <div className="grid place-items-center">
              <p className="italic">No comments yet</p>
            </div>
          )}
        </section>
      </div>
    </section>
  );
};
