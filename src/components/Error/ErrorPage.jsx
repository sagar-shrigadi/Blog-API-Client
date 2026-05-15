import { Link } from "react-router";

export const ErrorPage = () => {
  return (
    <section className="min-h-dvh min-w-dvw flex flex-col justify-center items-center gap-6 md:gap-8 bg-rose-600 text-black">
      <h1 className="text-7xl md:text-9xl font-extrabold">404</h1>
      <h2 className="text-5xl md:text-5xl font-bold">Oops!</h2>
      <p className="text-3xl md:text-3xl md:max-w-[35ch] text-center">
        The Page you are looking for doesn't exist. Please go to back to
        homepage.
      </p>
      <Link
        href="/"
        className="cursor-pointer text-2xl md:text-3xl px-6 py-3 md:px-8 md:py-4 font-semibold bg-black text-white rounded"
      >
        Go Home
      </Link>
    </section>
  );
};
