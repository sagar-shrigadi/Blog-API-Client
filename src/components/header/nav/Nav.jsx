import { Link } from "react-router";

export const Nav = () => {
  return (
    <nav>
      <ul className="flex gap-5">
        <li>
          <Link to="login">Login</Link>
        </li>
        <li>
          <a href="">Sign Up</a>
        </li>
      </ul>
    </nav>
  );
};
