import "../Styles/Home.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "./LocationContext"; //

const api = {
  key: "51792902640cee7f3338178dbd96604a",
  base: "https://pro.openweathermap.org/data/2.5/",
};

interface HomeForecastData {
  list: {
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    weather: {
      icon: string;
    }[];
  }[];
}
var firstRun = true;
function HomeForecast() {
  const { locationData } = useLocation(); // This uses the context we've set up
  const [forecast, setWeatherData] = useState<HomeForecastData | null>(null); // Initialize weatherData state
  const formatDate = (timestamp: number | undefined): string => {
    if (!timestamp) return "";

    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    return formattedDate;
  };

  useEffect(() => {
    if (locationData.locations.length > 0) {
      const { lat, lon } = locationData.locations[0];
      // Use the lat and lon to fetch weather data
      fetch(
        `${api.base}forecast/daily?lat=${lat}&lon=${lon}&APPID=${api.key}&units=imperial`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data); // Update state with fetched weather data
          console.log(data); // Logging for debugging purposes
        })
        .catch((error) => console.error("Failed to fetch weather data", error));
    }
    if(firstRun){
      var latlong: Array<number> = [0.0, 0.0];
      
      var options = {
        highAccuracyEnabled: true,
        timeout: 10000,
        maxAge: 0,
      };
      
      function Success(position: { coords: any }) {
        console.log(`LOCATION RECEIVED`);
        latlong[0] = position.coords.latitude;
        latlong[1] = position.coords.longitude;
        fetch(
          `${api.base}forecast/daily?lat=${latlong[0]}&lon=${latlong[1]}&APPID=${api.key}&units=imperial`
        )
          .then((res) => res.json())
          .then((data) => {
            setWeatherData(data); // Update state with fetched weather data
            console.log(data); // Logging for debugging purposes
          })
          .catch((error) => console.error("Failed to fetch weather data", error));
      }
      
      function Errors(err: { code: any; message: any }) {
        console.warn(`ERROR(${err.code}): ${err.message}`); //Basic error function, not much to explain
      }
      
      if (navigator.geolocation) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then((result) => {
            console.log(result);
            if (result.state === "granted") {
              console.log(`LOCATION REQUEST 1`);
              navigator.geolocation.getCurrentPosition(Success, Errors, options);
            } else if (result.state === "prompt") {
              console.log(`LOCATION REQUEST 2`);
              navigator.geolocation.getCurrentPosition(Success, Errors, options);
            } else if (result.state === "denied") {
              //If denied then you have to show instructions to enable location
            }
          });
      } else {
        console.log("Geolocation not supported");
      }
      
      //firstRun = false;
    }
  }, [locationData]); // Dependency array includes locationData to re-run effect when locationData changes

  // Ensure the rendering logic below does not contain undefined references

  return (
    <div className="middle">
      <div>
        <ul className="days-list">
          <li>
            <img
              src={`http://openweathermap.org/img/w/${forecast?.list?.[0]?.weather?.[0]?.icon}.png`}
            />
            <span>
              {forecast?.list?.[0]?.dt && formatDate(forecast.list?.[0]?.dt)}
            </span>
            <span className="day-temp">
              {forecast?.list?.[0]?.temp?.min}°F/
              {forecast?.list?.[0]?.temp?.max}°F
            </span>
          </li>
          <li>
            <img
              src={`http://openweathermap.org/img/w/${forecast?.list?.[1]?.weather?.[0]?.icon}.png`}
            />
            <span>
              {forecast?.list?.[1]?.dt && formatDate(forecast.list?.[1]?.dt)}
            </span>
            <span className="day-temp">
              {forecast?.list?.[1]?.temp?.min}°F/
              {forecast?.list?.[1]?.temp?.max}°F
            </span>
          </li>
          <li>
            <img
              src={`http://openweathermap.org/img/w/${forecast?.list?.[2]?.weather?.[0]?.icon}.png`}
            />
            <span>
              {forecast?.list?.[2]?.dt && formatDate(forecast.list?.[2]?.dt)}
            </span>
            <span className="day-temp">
              {forecast?.list?.[2]?.temp?.min}°F/
              {forecast?.list?.[2]?.temp?.max}°F
            </span>
          </li>
          <li>
            <img
              src={`http://openweathermap.org/img/w/${forecast?.list?.[3]?.weather?.[0]?.icon}.png`}
            />
            <span>
              {forecast?.list?.[3]?.dt && formatDate(forecast.list?.[3]?.dt)}
            </span>
            <span className="day-temp">
              {forecast?.list?.[3]?.temp?.min}°F/
              {forecast?.list?.[3]?.temp?.max}°F
            </span>
          </li>
          <li>
            <img
              src={`http://openweathermap.org/img/w/${forecast?.list?.[4]?.weather?.[0]?.icon}.png`}
            />
            <span>
              {forecast?.list?.[4]?.dt && formatDate(forecast.list?.[4]?.dt)}
            </span>
            <span className="day-temp">
              {forecast?.list?.[4]?.temp?.min}°F/
              {forecast?.list?.[4]?.temp?.max}°F
            </span>
          </li>
        </ul>
        <div />
      </div>
    </div>
  );
}
export default HomeForecast;
