import App from "./src/App";
import { ErrorPage } from "./src/components/Error/ErrorPage";
import { Index } from "./src/components/Pages/Index/Index";
import { Login } from "./src/components/Pages/Login/Login";
import { Post } from "./src/components/Pages/Post/Post";
import { SignUp } from "./src/components/Pages/SignUp/SignUp";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "posts/:postId", element: <Post /> },
    ],
  },
];
export default routes;
