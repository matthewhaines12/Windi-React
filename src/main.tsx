import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import "./Styles/App.css";
import Home from "./routes/Home";
import Hourly from "./routes/Hourly";
import Radar from "./routes/Radar";
import ErrorPage from "./routes/ErrorPage";

interface LocationData {
  Array: {
    lon: number;
    lat: number;
  }[];
}
const AppLayout = () => {
  return (
    <>
      <Navbar onLocationUpdate={handleLocationUpdate}/>
      <Outlet />
    </>
  );
};

const handleLocationUpdate = (newLocationData: LocationData) => {
  // Handle location update logic here
  console.log("Location data updated in App:", newLocationData);
  // You can update state or perform any other logic here
};

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

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);