import { baseUrl } from "../baseUrl";

export const signUpUser = async (credentials) => {
  try {
    const response = await fetch(`${baseUrl}/sign-up`, {
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
};
