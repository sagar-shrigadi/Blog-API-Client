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
    const data = await response.json();
    console.log("response after converting to json", data);

    if (!response.ok) {
      console.log("response error", data.msg);
      throw Error(`${data.msg}`);
    } else {
      console.log("Post Comment response", data);
      return data;
    }
  } catch (error) {
    console.error("Post Comment", error);
  }
};
