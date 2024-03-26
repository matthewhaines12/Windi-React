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
  const { setLocationData } = useLocation();
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
      const { lat, lng } = locationData.locations[0];
      // Use the lat and lon to fetch weather data
      fetch(
        `${api.base}forecast/daily?lat=${lat}&lon=${lng}&APPID=${api.key}&units=imperial`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data); // Update state with fetched weather data
          console.log(data); // Logging for debugging purposes
        })
        .catch((error) => console.error("Failed to fetch weather data", error));
    } else if (firstRun) {

      var options = {
        highAccuracyEnabled: true,
        timeout: 10000,
        maxAge: 0,
      };

      function Success(position: { coords: any }) {

        setLocationData({locations: [{ lat: position.coords.latitude, lng: position.coords.longitude }],});
        fetch(
          `${api.base}forecast/daily?lat=${locationData.locations[0]}&lon=${locationData.locations[1]}&APPID=${api.key}&units=imperial`
        )
          .then((res) => res.json())
          .then((data) => {
            setWeatherData(data); // Update state with fetched weather data
            console.log(data); // Logging for debugging purposes
          })
          .catch((error) =>
            console.error("Failed to fetch weather data", error)
          );
      }

      function Errors(err: { code: any; message: any }) {
        console.warn(`ERROR(${err.code}): ${err.message}`); //Basic error function, not much to explain
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
            //If denied then you have to show instructions to enable location
          }
        });
      } else {
        console.log("Geolocation not supported");
      }

      firstRun = false;
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
              {Math.round(forecast?.list?.[0]?.temp?.min ?? 0)}°F/
              {Math.round(forecast?.list?.[0]?.temp?.max ?? 0)}°F
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
              {Math.round(forecast?.list?.[1]?.temp?.min ?? 0)}°F/
              {Math.round(forecast?.list?.[1]?.temp?.max ?? 0)}°F
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
              {Math.round(forecast?.list?.[2]?.temp?.min ?? 0)}°F/
              {Math.round(forecast?.list?.[2]?.temp?.max ?? 0)}°F
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
              {Math.round(forecast?.list?.[3]?.temp?.min ?? 0)}°F/
              {Math.round(forecast?.list?.[3]?.temp?.max ?? 0)}°F
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
              {Math.round(forecast?.list?.[4]?.temp?.min ?? 0)}°F/
              {Math.round(forecast?.list?.[4]?.temp?.max ?? 0)}°F
            </span>
          </li>
        </ul>
        <div />
      </div>
    </div>
  );
}
export default HomeForecast;
