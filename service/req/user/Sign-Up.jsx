export const signUpUser = async (credentials) => {
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
};
