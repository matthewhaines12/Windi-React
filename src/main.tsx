// import React, { useEffect } from "react";
//import { createRoot } from "react-dom/client";
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

//import React from "react";
//import { render } from "react-dom";
//``;
//import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
//import Navbar from "./Components/Navbar";
//import "./App.css";
//import Home from "./routes/Home";
//import Hourly from "./routes/Hourly";
//import Radar from "./routes/Radar";
//import ErrorPage from "./routes/ErrorPage";
//import Weather from "./Components/Weather";

//const AppLayout: React.FC<{
  //city: string;
 // temperature: number;
 // description: string;
  //feelsLike: number;
//}> = ({ city, temperature, description, feelsLike }) => {
  //return (
    //<>
      //<Home
        //city={city}
       // temperature={temperature}
       // description={description}
       // feelsLike={feelsLike}
     // />
    //  <Navbar />
     // <Outlet />
   // </>
 // );
//};

//const App: React.FC = () => {
  //const [city, setCity] = React.useState("test");
  //const [temperature, setTemperature] = React.useState(0);
  //const [description, setDescription] = React.useState("Test");
  //const [feelsLike, setFeelsLike] = React.useState(0);

  //const handleWeatherUpdate = (
   // city: string,
   // temperature: number,
    //description: string,
    //feelsLike: number
  //) => {
    //setCity(city);
   // setTemperature(temperature);
    //setDescription(description);
    //setFeelsLike(feelsLike);
 // };

  //return (
    //<>
     // <Weather onWeatherUpdate={handleWeatherUpdate} />
     // <AppLayout
      //  city={city}
       // temperature={temperature}
       // description={description}
       // feelsLike={feelsLike}
      ///>
   // </>
  //);
//};
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
//const router = createBrowserRouter([
  //{
    //element: <App />,
    //errorElement: <ErrorPage />,
    //children: [
      //{
       // path: "/",
        //element: (
        //  <Home/>
        //),
      //},
      //{
      //  path: "hourly",
      //  element: <Hourly />,
     // },
     // {
      //  path: "radar",
        //element: <Radar />,
     // },
   // ],
  //},
//]);

//const rootElement = document.getElementById("root");
//if (rootElement) {
 // createRoot(rootElement).render(<RouterProvider router={router} />);
//}
import React, { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./routes/Home";
import Hourly from "./routes/Hourly";
import Radar from "./routes/Radar";
import ErrorPage from "./routes/ErrorPage";
import { createRoot } from 'react-dom/client';
import App from "./SearchShare";
import { LocationProvider } from './Components/LocationContext';

interface LocationData {
  Array: {
    lon: number;
    lat: number;
    // other properties if any
  }[];
}
/*const AppLayout = () => {
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
      <Navbar onLocationUpdate={handleLocationUpdate}/>
      <Outlet />
    </>
  );
};*/


const router = createBrowserRouter([
  {
    element: <App />,
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

createRoot(document.getElementById("root")!).render(
  <LocationProvider>
  <RouterProvider router={router} />
  </LocationProvider>
);
