import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./routes/Home";
import Hourly from "./routes/Hourly";
import Radar from "./routes/Radar";
import ErrorPage from "./routes/ErrorPage";

interface LocationData {
    Array: {
        lon: number;
        lat: number;
        // other properties if any
      }[];
  }

function App() {
  console.log("Rendering App component");
  const [locationData, setLocationData] = useState<LocationData>({ Array: []});

  const handleLocationUpdate = (newLocationData: LocationData) => {
    console.log("Before updating state - Current state:", locationData);
    setLocationData(newLocationData);
    console.log("Location data updated in App:", newLocationData);
    var latitude = newLocationData.Array?.[0]?.lat;
    var longitude = newLocationData.Array?.[0]?.lon;
    console.log("Lat and Lon:", latitude, longitude);
  };

  return (
    <>
      <Navbar onLocationUpdate={handleLocationUpdate}/>
      <Outlet/>
    </>
  );
}

export default App;