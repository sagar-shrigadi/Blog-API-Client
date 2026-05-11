import App from "./src/App";
import { Index } from "./src/components/Pages/Index/Index";
import { Post } from "./src/components/Pages/Post/Post";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Index /> },
      { path: "/:postId", element: <Post /> },
    ],
  },
];
export default routes;
