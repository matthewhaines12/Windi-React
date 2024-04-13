// Creates the router and links to pages

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./Routes/Home";
import Radar from "./Routes/Radar";
import ErrorPage from "./Routes/ErrorPage";
import { createRoot } from "react-dom/client";
import { LocationProvider } from "./Components/LocationContext";
import Navbar from "./Components/Navbar";

const router = createBrowserRouter([
  {
    element: <>
    <Navbar />
    <Outlet />
    </>,
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

// Wraps the RouterProvider in a LocationProvider to provide location context globally
createRoot(document.getElementById("root")!).render(
  <LocationProvider>
    <RouterProvider router={router} />
  </LocationProvider>
);
