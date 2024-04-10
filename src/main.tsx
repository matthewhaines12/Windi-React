import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Radar from "./routes/Radar";
import ErrorPage from "./routes/ErrorPage";
import { createRoot } from "react-dom/client";
import App from "./AppLayout";
import { LocationProvider } from "./Components/LocationContext";

const router = createBrowserRouter([
  {
    element: <App />, // Main application element
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
