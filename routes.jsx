import App from "./src/App";
import { Index } from "./src/components/Pages/Index/Index";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <Index /> }],
  },
];
export default routes;
