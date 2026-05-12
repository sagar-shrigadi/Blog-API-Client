import { useState } from "react";
import { useOutletContext } from "react-router";

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

    if (response.ok) {
      // console.log("User Login response", data);
      return data.token;
    }
  } catch (error) {
    console.error("Login Error", error.msg);
  }
}

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useOutletContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({ username, password });
    // console.log("token", token);
    setToken(token);
    // localStorage.setItem("token", token);
  };

  return (
    <section className="grow grid place-items-center mx-auto w-full min-h-1/2 py-1 px-3 lg:text-2xl lg:w-5xl lg:py-2.5">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-5 text-lg"
      >
        <div className="grid gap-2 min-w-3xs">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-sm py-0.5 px-1"
          />
        </div>
        <div className="grid gap-2 min-w-3xs">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-sm py-0.5 px-1"
          />
        </div>
        <button
          type="submit"
          className="mt-4 border rounded-sm cursor-pointer px-8 py-1"
        >
          Login
        </button>
      </form>
    </section>
  );
};
