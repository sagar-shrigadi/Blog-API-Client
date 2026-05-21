import { useState } from "react";
import { Link, useLocation, useNavigate, useOutletContext } from "react-router";
import { Form } from "../../Forms/Form";
import { SectionWrapper } from "../../Forms/SectionWrapper";
import { loginUser } from "../../../service/user/Login";
import { ReqErr } from "../../ReqErr/ReqErr";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState(null);
  const { setToken } = useOutletContext();
  const location = useLocation();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userToken = await loginUser({ username, password });

      localStorage.setItem("token", userToken);
      setToken(userToken);
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setError(error.message || "An unexpected error occurred!");
    }
  };

  return (
    <SectionWrapper>
      <h1 className="text-4xl text-balance">Please Log In! </h1>
      {Error && <ReqErr>{Error}</ReqErr>}
      <Form
        handleSubmit={handleSubmit}
        setUsername={setUsername}
        setPassword={setPassword}
        btnText="Login"
      />
      <p className="lg:text-xl">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-800">
          Sign Up
        </Link>
      </p>
    </SectionWrapper>
  );
};
