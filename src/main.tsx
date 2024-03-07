import React, {useEffect, useState} from "react";
import { createRoot } from "react-dom/client";
import {createBrowserRouter, RouterProvider, Route, Link, Outlet,} from "react-router-dom";
import Navbar from "./Components/Navbar";
import "./App.css";
import Home from "./routes/Home";
import Hourly from "./routes/Hourly";
import Radar from "./routes/Radar";
import ErrorPage from "./routes/ErrorPage";
//import getWeather from "./Components/FetchCurrent";
//import Header from "./Header/Header";
//import { Route, Routes, Outlet } from "react-router";

//const [weatherData, setWeatherData] = useState<Array<number | string>>([])

//PLEASE BE WARY OF HOW MANY TIMES PER HOUR YOU RUN API CALLS!!! ONLY 60 PER HOUR!!!!!
const AppLayout = () => {
  console.log(`Test Applayout`);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
/*
async function Data(){
  console.log(`Test1: Data Retrieved`);
  const [currWeather, setCurrentWeather] = useState<Array<number|string>>([]);
  useEffect(()=>{
    const weather = () => {
      getWeather().then((weatherArray)=>{
        setCurrentWeather(weatherArray);
      });
    }

      weather();
    }, []);
  return currWeather;
}
*/
/*Data()
.then((result) => {
  console.log(`Data() ran...`);
  setWeatherData(result);
    const router = createBrowserRouter([
      {
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: Home(weatherData),
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
  useEffect(()=>{
    createRoot(document.getElementById("root")).render(
      <RouterProvider router={router} />
    );
  }, [weatherData])
    
});
*/
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

//Learning how to render each part individually

//var test = true;
//var root = createRoot(document.getElementById("root"))
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
//if(test){
//  console.log(`Test ran`);
//  root.render(<Home />);
//}

