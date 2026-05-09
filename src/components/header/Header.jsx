export const Header = () => {
  return (
    <header className="mx-auto flex justify-center text-2xl w-5xl py-2.5">
      <a href="/" className="mr-auto">
        My Blog
      </a>

      <nav className="flex gap-10">
        <a href="">Login</a>
        <a href="">Sign Up</a>
      </nav>
    </header>
  );
};
