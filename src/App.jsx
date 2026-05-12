import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Outlet } from "react-router";
import { useState } from "react";

function App() {
  const [token, setToken] = useState();
  return (
    <>
      <Header />
      <Outlet context={[token, setToken]} />
      <Footer />
    </>
  );
}

export default App;
