/*import HomeCurrentWeather from "../Components/HomeCurrent";
import HomeForecast from "../Components/HomeForecast";

function Home(){
  const locationData = {
    Array: [
      {
        lon: 0,
        lat: 0,
      },
    ],
  };
  return(
    <div>
      <HomeCurrentWeather locationData={locationData}/>
    </div>
  )
};
export default Home; */
import React, { useState } from "react";
import HomeCurrentWeather from "../Components/HomeCurrent";
import Search from "../Components/Search";

interface LocationData {
  Array: {
    lon: number;
    lat: number;
  }[];
}

import { useLocation } from "../Components/LocationContext";

function Home() {
  const {} = useLocation();

  return (
    <div>
      <HomeCurrentWeather />
      {/* You can now remove the local state and useState import since it's managed globally */}
    </div>
  );
}

export default Home;
