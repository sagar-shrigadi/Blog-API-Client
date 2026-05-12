import App from "./src/App";
import { Index } from "./src/components/Pages/Index/Index";
import { Login } from "./src/components/Pages/Login/Login";
import { Post } from "./src/components/Pages/Post/Post";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Index /> },
      { path: "/:postId", element: <Post /> },
      { path: "/login", element: <Login /> },
    ],
  },
];
export default routes;
