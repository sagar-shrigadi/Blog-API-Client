export const CommentCard = ({ comment }) => {
  return (
    <article className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg">{comment.authorName}</h3>
        <p>{comment.createdAt}</p>
      </div>
      <p className="text-pretty max-w-[55ch]">{comment.message}</p>
    </article>
  );
};
