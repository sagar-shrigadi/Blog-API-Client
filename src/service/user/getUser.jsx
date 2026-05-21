import { getUserInfoFromToken } from "../../Helper/useToken";

export const getUserById = async (token) => {
  const decoded = getUserInfoFromToken(token);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/me/${decoded.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      const status = response.status;
      console.error("response Status when response is not ok", status);

      switch (status) {
        case "403":
          console.error("403 forbidden!");
          break;
        case "404":
          console.error(response.msg);

          break;

        default:
          console.error(response.msg);

          break;
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error getting user data using /me/:userId", error);
  }
};
