import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./Navbar";
import HomeCurrent from "./HomeCurrent";

interface LocationData {
    Array: {
        lon: number;
        lat: number;
        // other properties if any
      }[];
  }

function App() {
  const [locationData, setLocationData] = useState<LocationData>({ Array: []});

  const handleLocationUpdate = (newLocationData: LocationData) => {
    setLocationData(newLocationData);
  };

  return (
    <Router>
      <Navbar onLocationUpdate={handleLocationUpdate}/>
      <Routes>
        <Route path="/" element={<HomeCurrent locationData={locationData} />}>
          <HomeCurrent locationData={locationData} />
        </Route>
        {/* Add other routes if needed */}
      </Routes>
    </Router>
  );
}

export default App;