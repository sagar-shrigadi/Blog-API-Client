export const CommentCard = ({ comment }) => {
  return (
    <article className="flex flex-col gap-2 border rounded px-2 py-1">
      <div className="flex justify-between items-center">
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
      <p className="text-base md:text-lg text-pretty max-w-[55ch]">
        {comment.message}
      </p>
    </article>
  );
};
