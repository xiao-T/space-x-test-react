import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// router config
import routers from "./router";
import { CircularProgress } from "@mui/material";

function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <BrowserRouter>
        <Routes>
          {routers.map((item, index) => {
            return (
              <Route key={index} path={item.path} Component={item.Component} />
            );
          })}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
