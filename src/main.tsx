// Creates the router and links to pages

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Radar from "./routes/Radar";
import ErrorPage from "./routes/ErrorPage";
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

// wraps the RouterProvider in a LocationProvider to provide location context globally
createRoot(document.getElementById("root")!).render(
  <LocationProvider>
    <RouterProvider router={router} />
  </LocationProvider>
);
