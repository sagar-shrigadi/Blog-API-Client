import { baseUrl } from "../baseUrl";

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
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
};
