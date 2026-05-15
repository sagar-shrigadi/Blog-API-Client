export const deleteComment = async (token, commentId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("response from server", response);
    if (!response.ok) {
      console.log("response error", response.status);
      throw Error(`${response.status}`);
    } else {
      const data = { msg: "successfully deleted!" };
      return data;
    }
  } catch (error) {
    console.error("Delete Comment", error);
  }
};
