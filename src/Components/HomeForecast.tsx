import React from "react";
// import { WeatherContext } from "../Components/WeatherContext";
import "../Styles/Home.css";
import { FaLocationArrow } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa";
import { CiCloudOn } from "react-icons/ci";
import { useState, useEffect } from "react";

const api = {
    key: "51792902640cee7f3338178dbd96604a",
    base: "https://pro.openweathermap.org/data/2.5/",
  };
  
  const lat = "40.3212";
  const long = "-79.3795";

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

function HomeForecast() {
    const formatDate = (timestamp: number | undefined): string => {
        if (!timestamp) return "";
    
        const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
        const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric" };
        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
    
        return formattedDate;
      };
  //const[search, setSearch] = useState("");
  //const searchPressed = () =>{
  const [forecast, setForecast] = useState<HomeForecastData>({
    list: [
        {
          dt: 0,
          temp: {
            min: 0,
            max: 0,
          },
          weather: [
            {
              icon: " ",
            },
          ],
        },
      ],
    });

useEffect(() => {
  fetch(`${api.base}forecast/daily?lat=${lat}&lon=${long}&APPID=${api.key}&units=imperial`)
    .then((res) => res.json())
    .then((result : HomeForecastData) => {
      setForecast(result);
    })
    .catch((error) => {
      console.error("Error fetching hourly data:", error);
    });
}, []);

  return (
<div className="middle">
<div>
  <ul className="days-list">
    <li>
    <img
    src={`http://openweathermap.org/img/w/${forecast.list?.[0]?.weather?.[0]?.icon}.png`}
     />
      <span>{forecast.list?.[0]?.dt && formatDate(forecast.list?.[0]?.dt)}</span>
      <span className="day-temp">{forecast.list?.[0]?.temp?.min}°F/{forecast.list?.[0]?.temp?.max}°F</span>
    </li>
    <li>
    <img
    src={`http://openweathermap.org/img/w/${forecast.list?.[1]?.weather?.[0]?.icon}.png`}
     />
      <span>{forecast.list?.[1]?.dt && formatDate(forecast.list?.[1]?.dt)}</span>
      <span className="day-temp">{forecast.list?.[1]?.temp?.min}°F/{forecast.list?.[1]?.temp?.max}°F</span>
    </li>
    <li>
    <img
    src={`http://openweathermap.org/img/w/${forecast.list?.[2]?.weather?.[0]?.icon}.png`}
     />
      <span>{forecast.list?.[2]?.dt && formatDate(forecast.list?.[2]?.dt)}</span>
      <span className="day-temp">{forecast.list?.[2]?.temp?.min}°F/{forecast.list?.[2]?.temp?.max}°F</span>
    </li>
    <li>
    <img
    src={`http://openweathermap.org/img/w/${forecast.list?.[3]?.weather?.[0]?.icon}.png`}
     />
      <span>{forecast.list?.[3]?.dt && formatDate(forecast.list?.[3]?.dt)}</span>
      <span className="day-temp">{forecast.list?.[3]?.temp?.min}°F/{forecast.list?.[3]?.temp?.max}°F</span>
    </li>
    <li>
    <img
    src={`http://openweathermap.org/img/w/${forecast.list?.[4]?.weather?.[0]?.icon}.png`}
     />
      <span>{forecast.list?.[4]?.dt && formatDate(forecast.list?.[4]?.dt)}</span>
      <span className="day-temp">{forecast.list?.[4]?.temp?.min}°F/{forecast.list?.[4]?.temp?.max}°F</span>
    </li>
  </ul>
  <div />
</div>
</div>
  )
};
export default HomeForecast;