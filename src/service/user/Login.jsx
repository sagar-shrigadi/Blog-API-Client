export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      console.error("Login Error", response.status);
      if (response.status === 400) {
        throw new Error(`Invalid Crendentials!`);
      }
      throw new Error(`Server responded with status ${response.status}`);
    } else {
      const data = await response.json();
      return data.token;
    }
  } catch (error) {
    console.error("some error", error);
    throw error;
  }
};
