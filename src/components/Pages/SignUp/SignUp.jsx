import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Form } from "../../Forms/Form";
import { SectionWrapper } from "../../Forms/SectionWrapper";

async function signUpUser(credentials) {
  try {
    const response = await fetch("http://localhost:3000/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const userInfo = await response.json();

    if (response.ok) {
      // console.log("User Login response", data);
      return userInfo;
    }
  } catch (error) {
    console.error("Login Error", error.msg);
  }
}
export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = await signUpUser({ username, password });
    console.log("User Sign-Up", userInfo);
    navigate("/");
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
