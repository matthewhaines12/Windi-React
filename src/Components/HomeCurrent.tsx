// File that calls on most of the current weather data such as max, min, current, and feels like temps.
// Also weather description, wind, state, and country name.

import "../Styles/Home.css";
import { FaLocationArrow } from "react-icons/fa";
import HomeForecast from "./HomeForecast";
import { useEffect, useState } from "react";
import { useLocation } from "./LocationContext";
import HomeHourly from "./HomeHourly";

interface Weather {
  description: string;
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
  const { locationData } = useLocation(); // This uses the context we've set up
  const { setLocationData } = useLocation();
  const [home, setWeatherData] = useState<HomeData | null>(null); // Initialize weatherData state
  const [locationFailed, setLocationFailed] = useState(false);

  useEffect(() => {
    if (locationData.locations.length > 0) {
      // If there is already stored locationdata then use it for the api call
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
    } else if (firstRun) {
      // If this is the splash then do the following

      var options = {
        highAccuracyEnabled: true,
        timeout: 10000,
        maxAge: 0,
      };

      function Success(position: { coords: any }) {
        // If geolocation is successful

        setLocationData({
          locations: [
            { lat: position.coords.latitude, lng: position.coords.longitude },
          ],
        }); // Update locationData

        fetch(
          `${api.base}weather?lat=${locationData.locations[0]}&lon=${locationData.locations[1]}&appid=${api.key}&units=imperial`
        )
          .then((res) => res.json())
          .then((data) => {
            setWeatherData(data); // Update weather data with the new output from the api call
            console.log(data);
          })
          .catch((error) =>
            console.error("Failed to fetch weather data", error)
          );
      }

      function Errors(err: { code: any; message: any }) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        setLocationFailed(true);
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
          }
        });
      } else {
        console.log("Geolocation not supported");
        setLocationData({ locations: [{ lat: 45, lng: 45 }] });
      }
      firstRun = false;
    }
  }, [locationData]);
  // Parse through what API Call's info using home from setWeatherData and the interfaces
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
              <div className="day-stat">
                <span className="title">Min/Max </span>
                <span className="value">
                  {Math.round(home?.main?.temp_min ?? 0)}°F/
                  {Math.round(home?.main?.temp_max ?? 0)}°F
                </span>
              </div>
              <div className="day-stat">
                <span className="title">HUMIDITY </span>
                <span className="value">{home?.main?.humidity ?? 0} %</span>
              </div>
              <div className="day-stat">
                <span className="title">WIND GUSTS </span>
                <span className="value">
                  {Math.round(home?.wind?.gust ?? 0)} mph
                </span>
              </div>
              <div className="day-stat">
                <span className="title">FEELS LIKE </span>
                <span className="value">
                  {Math.round(home?.main?.feels_like ?? 0)}°F
                </span>
              </div>
              <div className="day-stat">
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
