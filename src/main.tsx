<<<<<<< Updated upstream
import React from "react";
=======
// import React, { useEffect } from "react";
>>>>>>> Stashed changes
import { createRoot } from "react-dom/client";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Link,
//   Outlet,
// } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import "./App.css";
// import Home from "./routes/Home";
// import Hourly from "./routes/Hourly";
// import Radar from "./routes/Radar";
// import ErrorPage from "./routes/ErrorPage";
// import Weather from "./Components/Weather";

// //PLEASE BE WARY OF HOW MANY TIMES PER HOUR YOU RUN THE 'CurrentWeather' FUNCTION!!! ONLY 60 PER HOUR!!!!!
// const AppLayout = () => {
//   return (
//     <>
//       <Weather />
//       <Navbar />
//       <Outlet />
//     </>
//   );
// };
// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "/",
//         element: <Home city={""} temperature={0} />,
//       },
//       {
//         path: "hourly",
//         element: <Hourly />,
//       },
//       {
//         path: "radar",
//         element: <Radar />,
//       },
//     ],
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// );

import React from "react";
import { render } from "react-dom";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Location from "./Components/Geolocation";
import "./App.css";
import Home from "./routes/Home";
import Hourly from "./routes/Hourly";
import Radar from "./routes/Radar";
import ErrorPage from "./routes/ErrorPage";
<<<<<<< Updated upstream
import CurrentWeather from "./Components/CurrentWeather";

//PLEASE BE WARY OF HOW MANY TIMES PER HOUR YOU RUN THE 'CurrentWeather' FUNCTION!!! ONLY 60 PER HOUR!!!!!
const AppLayout = () => {
=======
import Weather from "./Components/Weather";

const AppLayout: React.FC<{ city: string; temperature: number }> = ({
  city,
  temperature,
}) => {
>>>>>>> Stashed changes
  return (
    <>
      <Home city={city} temperature={temperature} />
      <Navbar />
      <Outlet />
<<<<<<< Updated upstream
      <Location />
      <CurrentWeather />  
=======
>>>>>>> Stashed changes
    </>
  );
};

<<<<<<< Updated upstream
=======
const App: React.FC = () => {
  const [city, setCity] = React.useState("");
  const [temperature, setTemperature] = React.useState(0);

  const handleWeatherUpdate = (city: string, temperature: number) => {
    setCity(city);
    setTemperature(temperature);
  };

  return (
    <>
      <Weather onWeatherUpdate={handleWeatherUpdate} />
      <AppLayout city={city} temperature={temperature} />
    </>
  );
};

>>>>>>> Stashed changes
const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home city={""} temperature={0} />,
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
