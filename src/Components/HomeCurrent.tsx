// File that calls on most of the current weather data such as max, min, current, and feels like temps.
// Also weather description, wind, state, and country name.
import React, { ReactNode, useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { useLocation } from "./LocationContext";
import "../Styles/Home.css";
import { FiWind } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

interface Weather {
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  humidity: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
}

interface Wind {
  speed: number;
  gust: number;
}

interface Country {
  country: string;
}

interface HomeData {
  weather: Weather[];
  main: Main;
  wind: Wind;
  name: string;
  sys: Country;
}

const api = {
  key: "51792902640cee7f3338178dbd96604a",
  base: "https://pro.openweathermap.org/data/2.5/",
};

var firstRun = true;

function HomeCurrentWeather() {
  const { locationData } = useLocation();
  const { setLocationData } = useLocation();
  const [home, setWeatherData] = useState<HomeData | null>(null);

  useEffect(() => {
    if (locationData.locations.length > 0) {
      const { lat, lng } = locationData.locations[0];
      fetch(
        `${api.base}weather?lat=${lat}&lon=${lng}&appid=${api.key}&units=imperial`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data);
          console.log(data);
        })
        .catch((error) => console.error("Failed to fetch weather data", error));
    } else if (firstRun) {
      getLocation();
      firstRun = false;
    }
  }, [locationData]);

  function getLocation() {
    var options = {
      highAccuracyEnabled: true,
      timeout: 10000,
      maxAge: 0,
    };

    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        console.log(result);
        if (result.state === "granted" || result.state === "prompt") {
          console.log(`LOCATION REQUEST`);
          navigator.geolocation.getCurrentPosition(Success, Errors, options);
        }
      });
    } else {
      console.log("Geolocation not supported");
      setLocationData({ locations: [{ lat: 45, lng: 45 }] });
    }
  }

  function Success(position: { coords: any }) {
    setLocationData({
      locations: [
        { lat: position.coords.latitude, lng: position.coords.longitude },
      ],
    });
    if (locationData.locations[0] && locationData.locations[1]) {
      fetch(
        `${api.base}weather?lat=${locationData.locations[0]}&lon=${locationData.locations[1]}&appid=${api.key}&units=imperial`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data);
          console.log(data);
        })
        .catch((error) => console.error("Failed to fetch weather data", error));
    }
  }

  function Errors(err: { code: any; message: any }) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  return (
    <div className="current" style={{ transform: 'scale(0.9)' }}>
      <div className="top">
        
        

        <div className="info">
        <div className="info-col1">
          <div className="day-info">
            <div className="high-low">
              <p>
              <MdOutlineKeyboardDoubleArrowUp className="up-arrow" /> 
             
                {Math.round(home?.main?.temp_max ?? 0)}°F{" "}
              </p>
              <p>
              <MdKeyboardDoubleArrowDown className="down-arrow" />

          
                {Math.round(home?.main?.temp_min ?? 0)}°F{" "}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="location">
            <FaLocationArrow className="location-icon" />
            <p>{home?.name ?? "Enter city"}</p>
            <p>, {home?.sys?.country}</p>
          </div>
          <div className="temp">
            <h1>{`${Math.round(Number(home?.main?.temp ?? 0))}°F`}</h1>
          </div>
          <div className="description">
            <p>{home?.weather?.[0]?.description ?? "No description"}</p>
            <img
                  src={`http://openweathermap.org/img/w/${home?.weather?.[0]?.icon
                     ?? "02d"
                  }.png`}
                />
          </div>
        </div>
          <div className="info-col2">
            <div className="day-info">
            <div className="day-stat">
            <FiWind className="wind-icon" />
              <span className="value">
                {Math.round(home?.wind?.speed ?? 0)} mph
              </span>
            </div>
            <div className="day-stat">
              <WiHumidity className="humidity-icon"/>
              <span className="value">{home?.main?.humidity ?? 0} %</span>
            </div>
            </div>
          </div>
        </div>

        
          {/* <div className="day-stat">
            <span className="title">FEELS LIKE </span>
            <span className="value">
              {Math.round(home?.main?.feels_like ?? 0)}°F
            </span>
          </div> */}

          
        </div>
      </div>
   
  );
}

export default HomeCurrentWeather;

// return (
//   <div className="home">
//     <div className="container">
//       <div className="top">
//         <div className="location">
//           <FaLocationArrow className="location-icon" />
//           <p>{home?.name ?? "Enter city"}</p>
//           <p>, {home?.sys?.country}</p>
//         </div>
//         <div className="temp">
//           <h1>{`${Math.round(Number(home?.main?.temp ?? 0))}°F`}</h1>
//         </div>
//         <div className="description">
//           <p>{home?.weather?.[0]?.description ?? "No description"}</p>
//         </div>
//       </div>
//       <HomeHourly />
//       <div className="middle">
//         <div>
//           <ul className="days-list">
//             <HomeForecast />
//           </ul>
//           <div />
//         </div>
//         <div className="bottom">
//           <div className="day-info">
//             <div className="day-stat">
//               <span className="title">Min/Max </span>
//               <span className="value">
//                 {Math.round(home?.main?.temp_min ?? 0)}°F/
//                 {Math.round(home?.main?.temp_max ?? 0)}°F
//               </span>
//             </div>
//             <div className="day-stat">
//               <span className="title">HUMIDITY </span>
//               <span className="value">{home?.main?.humidity ?? 0} %</span>
//             </div>
//             <div className="day-stat">
//               <span className="title">WIND GUSTS </span>
//               <span className="value">
//                 {Math.round(home?.wind?.gust ?? 0)} mph
//               </span>
//             </div>
//             <div className="day-stat">
//               <span className="title">FEELS LIKE </span>
//               <span className="value">
//                 {Math.round(home?.main?.feels_like ?? 0)}°F
//               </span>
//             </div>
//             <div className="day-stat">
//               <span className="title">WIND SPEED </span>
//               <span className="value">
//                 {Math.round(home?.wind?.speed ?? 0)} mph
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// }
// export default HomeCurrentWeather;
