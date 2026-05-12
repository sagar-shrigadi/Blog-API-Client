export const Button = ({ btnText }) => {
  return (
    <button
      type="submit"
      className="mt-4 border rounded-sm cursor-pointer px-8 py-1"
    >
      {btnText}
    </button>
  );
};
