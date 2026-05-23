import { DateOptionsWIn, locales } from "../../Helper/DateOptions";
import DOMPurify from "dompurify";
export const PostCard = ({ post }) => {
  return (
    <article className="min-h-130 border flex flex-col gap-4 items-center rounded-2xl px-6 py-4 cursor-pointer">
      <p className="text-lg self-start mt-2 ">
        {new Date(post.createdAt).toLocaleDateString(locales, DateOptionsWIn)}
      </p>
      <h2 className="text-3xl self-start mb-2">{post.title}</h2>
      <article
        className="text-lg text-pretty max-w-[35ch] line-clamp-5 prose prose-headings:my-1 prose-h2:mb-4 lg:prose-xl mx-auto"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
      ></article>
      <div className="mt-auto self-stretch flex justify-between items-center text-lg">
        <p className="flex justify-center items-center gap-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="w-7"
          >
            {/* !Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc. */}
            <path d="M267.7 576.9C267.7 576.9 267.7 576.9 267.7 576.9L229.9 603.6C222.6 608.8 213 609.4 205 605.3C197 601.2 192 593 192 584L192 512L160 512C107 512 64 469 64 416L64 192C64 139 107 96 160 96L480 96C533 96 576 139 576 192L576 416C576 469 533 512 480 512L359.6 512L267.7 576.9zM332 472.8C340.1 467.1 349.8 464 359.7 464L480 464C506.5 464 528 442.5 528 416L528 192C528 165.5 506.5 144 480 144L160 144C133.5 144 112 165.5 112 192L112 416C112 442.5 133.5 464 160 464L216 464C226.4 464 235.3 470.6 238.6 479.9C239.5 482.4 240 485.1 240 488L240 537.7C272.7 514.6 303.3 493 331.9 472.8z" />
          </svg>
          {post._count.comments}
        </p>
        <p className="flex justify-center items-center gap-2">
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
      </div>
    </article>
  );
};
