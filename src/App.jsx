import { Outlet } from "react-router";
import "./App.css";
import { useEffect, useState } from "react";
import { getUserById } from "./service/user/getUser";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token !== null) {
          const getUser = await getUserById(token);
          console.log(
            "user info returned from server using token decoded id",
            getUser,
          );
          setUser(getUser.user);
        }
      } catch {
        console.error(
          "some error when fetching user info using /me/:userId route",
        );
      }
    };
    fetchUser();
  }, [token]);
  console.log("user info after useEffect", user);

  return (
    <>
      <Header setToken={setToken} user={user} setUser={setUser} />
      <Outlet context={{ token, setToken, user }} />
      <Footer />
    </>
  );
}

export default App;
