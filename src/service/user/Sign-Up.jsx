export const signUpUser = async (credentials) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      console.error("Sign Up Error", response.status);
      if (response.status === 400) {
        throw new Error(`Input fields must not be empty!`);
      }
    } else {
      const userInfo = await response.json();
      return userInfo;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
