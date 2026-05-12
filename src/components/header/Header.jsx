import { Link } from "react-router";
import { Nav } from "./Nav/Nav";

export const Header = () => {
  return (
    <header className="mx-auto flex justify-center text-xl w-full py-1 px-2 lg:text-2xl lg:w-5xl lg:py-2.5 ">
      <Link to="/" className="mr-auto">
        My Blog
      </Link>
      <Nav />
    </header>
  );
};
