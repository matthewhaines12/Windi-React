import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Radar from "./routes/Radar";
import ErrorPage from "./routes/ErrorPage";
import { createRoot } from "react-dom/client";
import App from "./SearchShare";
import { LocationProvider } from "./Components/LocationContext";

interface LocationData {
  Array: {
    lon: number;
    lat: number;
  }[];
}

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
