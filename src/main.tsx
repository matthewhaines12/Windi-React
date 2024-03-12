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
//---------------------------------------------

function getWeatherAuto() {
  var currWeather: Array<number | string> = [];
  var latlong: Array<number> = [0.0, 0.0];

  var options = {
    highAccuracyEnabled: true,
    timeout: 10000000,
    maxAge: 0,
  };

  /*
    'position' is an object given by the getCurrentPosition() function. The getCurrentPosition()
    function doesn't return anything, though, we just have access to it since Success() was passed to
    the getCurrentPosition() function. 'coords' is another object within the 'position' object
    that has latitude, longitude, accuracy, and probably more but I didn't bother checking.
    */
  function Success(position: { coords: any }) {
    latlong[0] = position.coords.latitude;
    latlong[1] = position.coords.longitude;

    const fetchWeather = async () => {
      try {
        const CurrentWeather = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latlong[0]}&lon=${latlong[1]}&appid=c4dc6e461bacc597e2caa8bc0042f17e`
        );
        console.log(`AXIOS RESPONSE: ${CurrentWeather.data}`);
        currWeather[0] = CurrentWeather.data.name;
        currWeather[1] = CurrentWeather.data.main.temp;
        currWeather[2] = CurrentWeather.data.clouds.all;
      } catch (err) {
        console.error(err);
      }
    };
    fetchWeather();
  }

  function Errors(err: { code: any; message: any }) {
    console.warn(`ERROR(${err.code}): ${err.message}`); //Basic error function, not much to explain
  }

//  useEffect(() => {
    //I'm still learning how this works, has to do with components and updating the webpage without repeatedly calling the same function. UseState works similar. https://youtu.be/O6P86uwfdR0  https://youtu.be/gv9ugDJ1ynU
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(Success, Errors, options);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(Success, Errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation not supported");
    }
//  }, []);

  return currWeather;
}
getWeatherAuto();
//---------------------------------------------
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

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<RouterProvider router={router} />);
}
