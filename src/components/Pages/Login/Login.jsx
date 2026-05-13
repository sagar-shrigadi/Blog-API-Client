import { useState } from "react";
import { Link, useLocation, useNavigate, useOutletContext } from "react-router";
import { Form } from "../../Forms/Form";
import { SectionWrapper } from "../../Forms/SectionWrapper";

async function loginUser(credentials) {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();

    if (!response.ok) {
      console.error("Login Error", data.msg);
      throw Error(`${data.msg}`);
    } else {
      // console.log("User Login response", data);
      return data.token;
    }
  } catch (error) {
    console.error("Login", error);
  }
}

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useOutletContext();
  const location = useLocation();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userToken = await loginUser({ username, password });
    console.log("token", userToken);

    localStorage.setItem("token", userToken);
    setToken(userToken);
    const redirectTo = location.state?.from || "/";
    navigate(redirectTo, { replace: true });
  };

  return (
    <SectionWrapper>
      <h1 className="text-4xl text-balance">Please Log In! </h1>
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
