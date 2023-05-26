// router
import { lazy } from "react";

// local files
const Home = lazy(() => import("../pages/home"));
const Detail = lazy(() => import("../pages/detail"));

const routers = [
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/:id",
    Component: Detail,
  },
];
export default routers;
