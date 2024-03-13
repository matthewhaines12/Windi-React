import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./routes/Home";
import Hourly from "./routes/Hourly";
import Radar from "./routes/Radar";
import ErrorPage from "./routes/ErrorPage";
import { createRoot } from "react-dom/client";
import App from "./SearchShare";
import axios from "axios"
import getWeather from "./Components/FetchCurrent";

var WeatherDataGlobal = [{}];

const weatherData = {
  currentTemp: 25,
  cloudCoverage: 40,
  city: 'New York'
};
WeatherDataGlobal = getWeather(WeatherDataGlobal);

interface LocationData {
  Array: {
    lon: number;
    lat: number;
    // other properties if any
  }[];
}
const AppLayout = () => {
  const [locationData, setLocationData] = useState<LocationData>({
    Array: [
      {
        lon: 0,
        lat: 0,
      },
    ],
  });

  const handleLocationUpdate = (newLocationData: LocationData) => {
    // Handle location update logic here
    setLocationData(newLocationData);
    console.log("Location data updated in App:", newLocationData);
    // You can update state or perform any other logic here
  };
  return (
    <>
      <Navbar onLocationUpdate={handleLocationUpdate} />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home {...weatherData} />,
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

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<RouterProvider router={router} />);
}
