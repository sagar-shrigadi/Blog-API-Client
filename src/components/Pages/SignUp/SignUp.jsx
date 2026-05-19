import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Form } from "../../Forms/Form";
import { SectionWrapper } from "../../Forms/SectionWrapper";
import { signUpUser } from "../../../service/user/Sign-Up";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = await signUpUser({ username, password });
    console.log("User Sign-Up", userInfo);
    navigate("/login");
  };
  return (
    <SectionWrapper>
      <h1 className="text-4xl text-balance">Please Sign Up</h1>
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
