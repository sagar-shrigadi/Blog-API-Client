import { DateOptions } from "./DateOptions";

export const PostCard = ({ post }) => {
  return (
    <article className="min-h-100 border flex flex-col gap-4 items-center rounded-2xl px-6 py-4 cursor-pointer">
      <p className="text-lg self-start mt-2 ">
        {new Date(post.createdAt).toLocaleDateString("en-GB", DateOptions)}
      </p>
      <h2 className="text-3xl self-start">{post.title}</h2>
      <p className="text-xl max-w-[35ch] line-clamp-5 text-pretty">
        {post.content}
      </p>
      <p className="mt-auto self-end text-lg flex justify-center items-center gap-2 ">
        Read More
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className="w-5"
        >
          {/* !Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc. */}
          <path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z" />
        </svg>
      </p>
    </article>
  );
};
