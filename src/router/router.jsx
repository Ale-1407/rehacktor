import { createBrowserRouter } from "react-router";
import routes from "./routes";
import Layout from "../components/layouts/Layout";
import Homepage from "../views/Homepage";

const router = createBrowserRouter([
  {
    path: routes.home,
    Component: Layout,
    children: [
      {
        path: routes.home,
        Component: Homepage,
      },
    ],
  },
]);

export default router;
