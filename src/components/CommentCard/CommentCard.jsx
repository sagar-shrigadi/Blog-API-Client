import { DateOptionsWEx, locales } from "../../Helper/DateOptions";

export const CommentCard = ({ comment }) => {
  return (
    <article className="flex flex-col gap-2 border rounded px-2 py-1 md:px-4">
      <div className="flex justify-between items-center">
        <div className="grow flex items-center justify-between gap-4">
          <h3 className="text-xl md:text-2xl font-bold">
            {comment.author.username}
          </h3>
          <p className="text-sm sm:text-base">
            {new Date(comment.createdAt).toLocaleDateString(
              locales,
              DateOptionsWEx,
            )}
          </p>
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
