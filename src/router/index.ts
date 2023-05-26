// router

import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// import Home from "../pages/home";
// import Detail from "../pages/detail";
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
