import React from "react";
// import { WeatherContext } from "../Components/WeatherContext";
import "../Components/Home.css";
import { FaLocationArrow } from "react-icons/fa";
import { useState, useEffect } from "react";
import HomeForecast from "./HomeForecast";

const api = {
    key: "51792902640cee7f3338178dbd96604a",
    base: "https://pro.openweathermap.org/data/2.5/",
  };
  
  
  interface Weather {
    description: string;
    // Add other properties if needed
  }
  
  interface Main {
    temp: number;
    humidity: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    // Add other properties if needed
  }
  
  interface Wind {
    speed: number;
    gust: number;
    // Add other properties if needed
  }
  
  interface HomeData {
    weather: Weather[];
    main: Main;
    wind: Wind;
    name: string;
    // Add other properties if needed
  }

  interface LocationData {
    Array: {
        lat: number;
        lon: number;
        // other properties if any
      }[];
    }
    
  
  interface HomeCurrentWeatherProps {
    locationData: LocationData;
  }

function HomeCurrentWeather({locationData}: HomeCurrentWeatherProps) {
var latitude = locationData?.Array?.[0]?.lat;
var longitude = locationData?.Array?.[0]?.lon;
  //const[search, setSearch] = useState("");
  //const searchPressed = () =>{
  const [home, setHome] = useState<HomeData | null>(null);
    
useEffect(() => {
  console.log("Location data in HomeCurrentWeather:", locationData);
  console.log("Lat and Long updated:", latitude, longitude);
  if (latitude !== undefined && longitude !== undefined) {
    console.log("Fetching data...");
  fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&APPID=${api.key}&units=imperial`)
    .then((res) => res.json())
    .then((result : HomeData) => {
      console.log("API Response:", result);
      setHome(result);
    })
    .catch((error) => {
      console.error("Error fetching hourly data:", error);
    });
  }
}, [latitude, longitude, locationData]);

if (!home) {
  // Render loading state or return null until data is fetched
  return null;
}

  return (
    <div className="home">
      <div className="container">
        <div className="top">
          <div className="location">
            <FaLocationArrow className="location-icon" />
            <p>{home?.name}</p>
          </div>
          <div className="temp">
            <h1>{home?.main?.temp}°F</h1>
          </div>
          <div className="description">
            <p>{home?.weather?.[0]?.description}</p>
          </div>
        </div>
        <div className="middle">
          <div>
            <ul className="days-list">
            <HomeForecast/>
            </ul>
            <div />
          </div>
          <div className="bottom">
            <div className="day-info">
              <div>
                <span className="title">Min/Max </span>
                <span className="value">{home?.main?.temp_min}°F/{home?.main?.temp_max}°F</span>
              </div>
              <div>
                <span className="title">HUMIDITY </span>
                <span className="value">{home?.main?.humidity} %</span>
              </div>
              <div>
                <span className="title">WIND GUSTS </span>
                <span className="value">{home?.wind?.gust} mph</span>
              </div>
              <div>
                <span className="title">FEELS LIKE </span>
                <span className="value">{home?.main?.feels_like} °F</span>
              </div>
              <div>
                <span className="title">WIND SPEED </span>
                <span className="value">{home?.wind?.speed} mph</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeCurrentWeather;