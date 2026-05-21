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

  return (
    <>
      <Header setToken={setToken} user={user} setUser={setUser} />
      <Outlet context={{ token, setToken, user }} />
      <Footer />
    </>
  );
}

export default App;
