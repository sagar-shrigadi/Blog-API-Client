import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Form } from "../../Forms/Form";
import { SectionWrapper } from "../../Forms/SectionWrapper";
import { signUpUser } from "../../../service/user/Sign-Up";
import { ReqErr } from "../../ReqErr/ReqErr";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState(null);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        await signUpUser({ username, password });
        navigate("/login");
      } else {
        setError("Username or Password cannot be empty!");
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred!");
    }
  };
  return (
    <SectionWrapper>
      <h1 className="text-4xl text-balance">Please Sign Up</h1>
      {Error && <ReqErr>{Error}</ReqErr>}
      <Form
        handleSubmit={handleSubmit}
        setUsername={setUsername}
        setPassword={setPassword}
        btnText="Sign Up"
      />
      <p className="lg:text-xl">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-800">
          Login
        </Link>
      </p>
    </SectionWrapper>
  );
};
