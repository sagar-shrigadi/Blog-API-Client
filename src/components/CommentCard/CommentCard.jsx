import { useOutletContext } from "react-router";
import { getUserInfoFromToken } from "../../../service/helperFunc/useToken";

async function deleteComment(token, commentId) {
  try {
    const response = await fetch(
      `http://localhost:3000/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("response from server", response);
    if (!response.ok) {
      console.log("response error", response.status);
      throw Error(`${response.status}`);
    } else {
      const data = { msg: "successfully deleted!" };
      return data;
    }
  } catch (error) {
    console.error("Delete Comment", error);
  }
}

export const CommentCard = ({ comment, setRefreshToggle }) => {
  const { token } = useOutletContext();
  // console.log("token value", token);
  const uniqueAnchorName = `--btn-${comment.id}`;
  const uniquePopoverId = `--moreActions-${comment.id}`;

  const userInfo = getUserInfoFromToken(token);

  const handleCommentDelete = async (e, commentId) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }
    try {
      const response = await deleteComment(token, commentId);
      console.log(response);
      setRefreshToggle((prev) => !prev);
    } catch (error) {
      console.error("Delete Comment", error);
    }
  };
  return (
    <article className="flex flex-col gap-2 border rounded px-2 py-1 md:px-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-4">
          <h3 className="text-xl md:text-2xl font-bold">
            {comment.author.username}
          </h3>
          <p className="text-sm sm:text-base">
            {new Date(comment.createdAt).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        {userInfo?.id === comment.authorId ? (
          <button
            popoverTarget={uniquePopoverId}
            style={{ anchorName: uniqueAnchorName }}
            className="cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              className="w-4 md:w-5"
            >
              {/* !Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc. */}
              <path d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z" />
            </svg>
          </button>
        ) : (
          ""
        )}
        <div
          popover="auto"
          id={uniquePopoverId}
          style={{ positionAnchor: uniqueAnchorName }}
          className="absolute [position-area:top_left] m-0 mb-4 min-h-15 bg-white px-6 py-3 border rounded shadow-md text-xl"
        >
          <form
            onSubmit={(e) => handleCommentDelete(e, comment.id)}
            className="border-b-2"
          >
            <button className="cursor-pointer">Delete</button>
          </form>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-base md:text-lg text-pretty max-w-[55ch]">
          {comment.message}
        </p>
      </div>
    </article>
  );
};
