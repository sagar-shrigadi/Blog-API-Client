import { jwtDecode } from "jwt-decode";

export const getUserInfoFromToken = (token) => {
  if (!token) return null;
  try {
    return jwtDecode(String(token));
  } catch (error) {
    console.error("Token Decode", error);
    return null;
  }
};
