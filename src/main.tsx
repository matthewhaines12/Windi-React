import { createRoot } from "react-dom/client";
import React from "react";
import { render } from "react-dom";
``;
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import "./App.css";
import Home from "./routes/Home";
import Hourly from "./routes/Hourly";
import Radar from "./routes/Radar";
import ErrorPage from "./routes/ErrorPage";
import Weather from "./Components/Weather";

const AppLayout: React.FC<{
  city: string;
  temperature: number;
  description: string;
  feelsLike: number;
}> = ({ city, temperature, description, feelsLike }) => {
  return (
    /* This went righ before <Navbar />
      <Home
        city={city}
        temperature={temperature}
        description={description}
        feelsLike={feelsLike}
      />
   */
    <>
      
      <Navbar />
      <Outlet />
    </>
  );
};

const App: React.FC = () => {
  const [city, setCity] = React.useState("test");
  const [temperature, setTemperature] = React.useState(0);
  const [description, setDescription] = React.useState("Test");
  const [feelsLike, setFeelsLike] = React.useState(0);

  const handleWeatherUpdate = (
    city: string,
    temperature: number,
    description: string,
    feelsLike: number
  ) => {
    setCity(city);
    setTemperature(temperature);
    setDescription(description);
    setFeelsLike(feelsLike);
  };

  return (
    <>
      <Weather onWeatherUpdate={handleWeatherUpdate} />
      <AppLayout
        city={city}
        temperature={temperature}
        description={description}
        feelsLike={feelsLike}
      />
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
        element: (
          <Home city={""} temperature={0} description={""} feelsLike={0} />
        ),
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
