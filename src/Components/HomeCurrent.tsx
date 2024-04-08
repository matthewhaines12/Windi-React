//file that calls on most of the current weather data such as max, min, current, and feels like temps. Also weather description, wind, state, and country name.

import "../Styles/Home.css";
import { FaLocationArrow } from "react-icons/fa";
import HomeForecast from "./HomeForecast";
import { useEffect, useState } from "react";
import { useLocation } from "./LocationContext";
import HomeHourly from "./HomeHourly";

interface Weather { /* items found within the weather array*/    
  description: string;
}

interface Main { /* items found in the main object */
  temp: number;
  humidity: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
}

interface Wind { /* items found in the wind object */
  speed: number;
  gust: number;
}

interface country { /* items found in the country object */
  country: string;
}

interface HomeData { /* used to parse through the data that is called on from the api */
  weather: Weather[];
  main: Main;
  wind: Wind;
  name: string;
  sys: country;
}

const api = {
  key: "51792902640cee7f3338178dbd96604a",
  base: "https://pro.openweathermap.org/data/2.5/",
};

var firstRun = true;

function HomeCurrentWeather() {
  const { locationData } = useLocation(); //initialize location used for search bar
  const { setLocationData } = useLocation(); //initializes set location used for geolocation
  const [home, setWeatherData] = useState<HomeData | null>(null); //initializes weather data

  useEffect(() => {
    if (locationData.locations.length > 0) { //if there is already stored locationdata then use it for the api call
      const { lat, lng } = locationData.locations[0];
      // Use the lat and lon to fetch weather data
      fetch(
        `${api.base}weather?lat=${lat}&lon=${lng}&appid=${api.key}&units=imperial`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data); // Update state with fetched weather data
          console.log(data); // Logging for debugging purposes
        })
        .catch((error) => console.error("Failed to fetch weather data", error));

    } else if (firstRun) { //if this is the splash then do the following

      var options = {
        highAccuracyEnabled: true,
        timeout: 10000,
        maxAge: 0,
      };

      function Success(position: { coords: any }) { //if geolocation is successful
       
        setLocationData({locations: [{ lat: position.coords.latitude, lng: position.coords.longitude }],}); //update locationData

        fetch(
          `${api.base}weather?lat=${locationData.locations[0]}&lon=${locationData.locations[1]}&appid=${api.key}&units=imperial`
        )
          .then((res) => res.json())
          .then((data) => {
            setWeatherData(data); //update weather data with the new output from the api call
            console.log(data); 
          })
          .catch((error) =>
            console.error("Failed to fetch weather data", error)
          );
      }

      function Errors(err: { code: any; message: any }) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      if (navigator.geolocation) {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
          console.log(result);
          if (result.state === "granted") {
            console.log(`LOCATION REQUEST 1`);
            navigator.geolocation.getCurrentPosition(Success, Errors, options);
          } else if (result.state === "prompt") {
            console.log(`LOCATION REQUEST 2`);
            navigator.geolocation.getCurrentPosition(Success, Errors, options);
          } else if (result.state === "denied") {
            //rely on filler info
          }
        });
      } else {
        console.log("Geolocation not supported");
        setLocationData({locations: [{ lat: 90, lng: 90 }],});
      }
      firstRun = false;

    } else {
      //NEED TO ADD SOMETHING HERE LIKE AN ERROR OR DEFAULT IN CASE THERE ARE ISSUES WITH GATHERING DATA
    }
  }, [locationData]); //includes location data so when changed, the use effect will run again

  //parse through what API Call's info using home from setWeatherData and the interfaces
  return (
    <div className="home">
      <div className="container">
        <div className="top">
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
          </div>
        </div>
        <HomeHourly />
        <div className="middle">
          <div>
            <ul className="days-list">
              <HomeForecast />
            </ul>
            <div />
          </div>
          <div className="bottom">
            <div className="day-info">
              <div>
                <span className="title">Min/Max </span>
                <span className="value">
                  {Math.round(home?.main?.temp_min ?? 0)}°F/
                  {Math.round(home?.main?.temp_max ?? 0)}°F
                </span>
              </div>
              <div>
                <span className="title">HUMIDITY </span>
                <span className="value">{home?.main?.humidity ?? 0} %</span>
              </div>
              <div>
                <span className="title">WIND GUSTS </span>
                <span className="value">
                  {Math.round(home?.wind?.gust ?? 0)} mph
                </span>
              </div>
              <div>
                <span className="title">FEELS LIKE </span>
                <span className="value">
                  {Math.round(home?.main?.feels_like ?? 0)}°F
                </span>
              </div>
              <div>
                <span className="title">WIND SPEED </span>
                <span className="value">
                  {Math.round(home?.wind?.speed ?? 0)} mph
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomeCurrentWeather;
