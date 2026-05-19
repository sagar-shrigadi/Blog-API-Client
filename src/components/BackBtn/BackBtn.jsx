import { useNavigate } from "react-router";

export const BackBtn = () => {
  let navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="self-start border text-lg rounded px-4 cursor-pointer"
    >
      Back
    </button>
  );
};
