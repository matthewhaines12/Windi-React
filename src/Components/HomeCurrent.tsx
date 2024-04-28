// File that calls on most of the current weather data such as max, min, current, and feels like temps.
// Also weather description, wind, state, and country name.

import { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { useLocation } from "./LocationContext";
import "../Styles/Home.css";
import { FiWind } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";
import {
  MdOutlineKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
} from "react-icons/md";

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
  const defaultCity = "New York";
  const [loading, setLoading] = useState(true);

  
  function fetchDefaultCityWeather() {
    fetch(`${api.base}weather?q=${defaultCity}&appid=${api.key}&units=imperial`)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((error) => console.error("Failed to fetch weather data", error));
  }

  function getLocation() {
    var options = {
      highAccuracyEnabled: true,
      timeout: 10000,
      maxAge: 0,
    };

    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(Success, Errors, options);
        }
      });
    } else {
      setLocationData({ locations: [{ lat: 45, lng: 45 }] });
    }
  }

  function Success(position: { coords: any }) {
    setLocationData({
      locations: [
        { lat: position.coords.latitude, lng: position.coords.longitude },
      ],
    });
    // if (locationData.locations[0] && locationData.locations[1]) { // unnessary check
      fetch(
        `${api.base}weather?lat=${locationData.locations[0]}&lon=${locationData.locations[1]}&appid=${api.key}&units=imperial`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data);
          setLoading(false);
        })
        .catch((error) => console.error("Failed to fetch weather data", error));
    // }
  }

  function Errors(err: { code: any; message: any }) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (locationData.locations.length > 0) {
      const { lat, lng } = locationData.locations[0];
      fetch(
        `${api.base}weather?lat=${lat}&lon=${lng}&appid=${api.key}&units=imperial`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data);
        })
        .catch((error) => console.error("Failed to fetch weather data", error));
    } else {
      fetchDefaultCityWeather();
     

      if (firstRun) {
        getLocation();
        firstRun = false;
      }
    }
  }, [locationData]);


  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="current">
      <div className="top">
        <div className="info" style={{ transform: "scale(0.9)" }}>
          <div className="info-col1">
            <div className="day-info">
              <div className="high-low">
                <p>
                  <MdOutlineKeyboardDoubleArrowUp className="up-arrow" />
                  {Math.round(home?.main?.temp_max ?? 0)}°F{" "}
                </p>
                <p>
                  <MdKeyboardDoubleArrowDown
                    className="down-arrow"
                    style={{ verticalAlign: "middle" }}
                  />
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
                src={`http://openweathermap.org/img/w/${
                  home?.weather?.[0]?.icon ?? "02d"
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
                <WiHumidity className="humidity-icon" />
                <span className="value">{home?.main?.humidity ?? 0} %</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCurrentWeather;
