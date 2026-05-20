export const addComment = async (token, postId, message) => {
  console.log("post id before sending post comments request", postId);
  console.log("Message body before sending post comments request", message);
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
    console.log("response from server", response);

    if (!response.ok) {
      console.error("add comment response error", response.status);
      throw new Error(`Some error occurred! Please try again!`);
    } else {
      const data = await response.json();
      console.log("add comment response after converting to json", data);
      return data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
