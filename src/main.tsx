import React, {useEffect} from "react";
import { createRoot } from "react-dom/client";
import {createBrowserRouter, RouterProvider,Route,Link,Outlet,} from "react-router-dom";
import Navbar from "./Components/Navbar";
import "./App.css";
import Home from "./routes/Home";
import Hourly from "./routes/Hourly";
import Radar from "./routes/Radar";
import ErrorPage from "./routes/ErrorPage";


//PLEASE BE WARY OF HOW MANY TIMES PER HOUR YOU RUN THE 'CurrentWeather' FUNCTION!!! ONLY 60 PER HOUR!!!!!
const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />

    </>
  );
};
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "hourly",
        element: <Hourly />,
      },
      {
        path: "radar",
        element: <Radar />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
