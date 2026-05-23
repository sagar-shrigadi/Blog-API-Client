import { useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router";
import DOMPurify from "dompurify";
import { FetchLoading } from "../../FetchLoading/FetchLoading";
import { FetchError } from "../../FetchError/FetchError";
import { BackBtn } from "../../BackBtn/BackBtn";
import { CommentCard } from "../../CommentCard/CommentCard";
import { DivWrapper } from "../../Forms/DivWrapper";
import { usePostById } from "../../../service/post/PostById";
import { addComment } from "../../../service/comment/AddComment";
import { DateOptionsWIn, locales } from "../../../Helper/DateOptions";
import { ReqErr } from "../../ReqErr/ReqErr";

export const Post = () => {
  const { postId } = useParams();
  const [refreshToggle, setRefreshToggle] = useState(false);
  const { post, error, loading } = usePostById(postId, refreshToggle);
  const [Error, setError] = useState(null);
  const { token } = useOutletContext();
  const [message, setMessage] = useState();
  const popoverRef = useRef(null);
  let navigate = useNavigate();
  const location = useLocation();

  const commentHandleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login", {
        replace: true,
        state: { from: location.pathname },
      });
    } else {
      try {
        await addComment(token, postId, message);
        setRefreshToggle((prev) => !prev);
        setMessage("");
        if (popoverRef.current) {
          popoverRef.current.hidePopover();
        }
      } catch (error) {
        console.error("New Comment Submision Error", error);
        setError(error.message || "An unexpected error occurred!");
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
        {new Date(post.createdAt).toLocaleDateString(locales, DateOptionsWIn)}
      </p>
      <h1 className="text-4xl text-balance mb-2 lg:mb-6">{post.title}</h1>
      {/*
      since react escapes string by default,
      thus to show the actual html stored form tinyMCE editor as it is, 
      we use the dangerouslySetInnerHTML attribute and once again just in case, use DOMPurify to sanitize content before serving 
       */}
      <article
        className="text-lg text-pretty prose prose-headings:mt-0 prose-h2:mb-4 prose-p:mb-4 prose-ul:mb-2 lg:prose-xl mx-auto mt-4"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
      ></article>

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
            ref={popoverRef}
            className="m-auto min-h-1/3 bg-gray-300 px-8 pt-6 pb-12 rounded-xl"
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
            {Error && <ReqErr>{Error}</ReqErr>}
            <form
              className="grow flex flex-col justify-between gap-8 mt-4"
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
        <section className="flex flex-col gap-6 mb-8">
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                setRefreshToggle={setRefreshToggle}
              />
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
