import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";

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