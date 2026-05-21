export const addComment = async (token, postId, message) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/posts/${postId}/comments`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      },
    );

    if (!response.ok) {
      console.error("add comment response error", response.status);
      throw new Error(`Some error occurred! Please try again!`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
