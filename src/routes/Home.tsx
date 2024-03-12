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

function Home() {
  const [locationData, setLocationData] = useState<LocationData>({
    Array: [
      {
        lon: 0,
        lat: 0,
      },
    ],
  });

  const handleLocationUpdate = (newLocationData: LocationData) => {
    setLocationData(newLocationData);
    console.log("Location data updated in Home:", newLocationData);
  };

  return (
    <div>
      
      {locationData?.Array?.[0]?.lat !== undefined && locationData?.Array?.[0]?.lon !== undefined && (
        <HomeCurrentWeather locationData={locationData} />
      )}
      
    </div>
  );
}

export default Home;