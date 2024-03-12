import React from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";

import "../Styles/Hourly.css";
import { useState, useEffect } from "react";

const api = {
  key: "51792902640cee7f3338178dbd96604a",
  base: "https://pro.openweathermap.org/data/2.5/",
};

const lat = "40.3212";
const long = "-79.3795";

interface City {
  name: string;
  // Add other properties as needed
}

interface WeatherItem {
  icon: string;
  // Add other properties as needed
}

interface ListItem {
  dt_txt: string;
  main: {
    temp: number;
  // Add other properties as needed
};
weather: WeatherItem[];
}

interface HourlyData {
  city: City;
  list: ListItem[];
  // Add other properties as needed
}

function Hourly() {
  //const[search, setSearch] = useState("");
  //const searchPressed = () =>{
  const [hours, setHours] = useState<HourlyData>({
    city: { name: "" }, // Provide initial values or empty objects
    list: [],
  });
useEffect(() => {
  fetch(`${api.base}forecast/hourly?lat=${lat}&lon=${long}&APPID=${api.key}&units=imperial`)
    .then((res) => res.json())
    .then((result : HourlyData) => {
      setHours(result);
    })
    .catch((error) => {
      console.error("Error fetching hourly data:", error);
    });
}, []);
  //}

  const convertToEST = (utcTime: string): string => {
    const utcDate = new Date(utcTime.replace(/ /, "T") + "Z");
    const estDate = new Date(utcDate.toLocaleString("en-US", { timeZone: "America/New_York" }));
    return estDate.toLocaleString();
  };

  return (
    <>
      <div className="hourly">
        <div className="container">
          <div className="top">
            <h3 className="hourly-title">Hourly Forecast</h3>
            <th>{hours.city.name}</th>
          </div>
          <div className="middle">
            <table className="hourly-outline">
              <thead className="hourly-times">
                <tr>
                  <th>{hours.list?.[0]?.dt_txt && convertToEST(hours.list[0].dt_txt)}</th>
                  <th>{hours.list?.[1]?.dt_txt && convertToEST(hours.list[1].dt_txt)}</th>
                  <th>{hours.list?.[2]?.dt_txt && convertToEST(hours.list[2].dt_txt)}</th>
                  <th>{hours.list?.[3]?.dt_txt && convertToEST(hours.list[3].dt_txt)}</th>
                  <th>{hours.list?.[4]?.dt_txt && convertToEST(hours.list[4].dt_txt)}</th>
                  <th>{hours.list?.[5]?.dt_txt && convertToEST(hours.list[5].dt_txt)}</th>
                  <th>{hours.list?.[6]?.dt_txt && convertToEST(hours.list[6].dt_txt)}</th>
                  <th>{hours.list?.[7]?.dt_txt && convertToEST(hours.list[7].dt_txt)}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hourly-images">
                  <td>
                    <img
                      src={`http://openweathermap.org/img/w/${hours.list?.[0]?.weather?.[0]?.icon}.png`}
                    />
                  </td>
                  <td>
                    <img
                      src={`http://openweathermap.org/img/w/${hours.list?.[1]?.weather?.[0]?.icon}.png`}
                      
                    />
                  </td>
                  <td>
                    <img
                      src={`http://openweathermap.org/img/w/${hours.list?.[2]?.weather?.[0]?.icon}.png`}
                      
                    />
                  </td>
                  <td>
                    <img
                      src={`http://openweathermap.org/img/w/${hours.list?.[3]?.weather?.[0]?.icon}.png`}
                      
                    />
                  </td>
                  <td>
                    <img
                      src={`http://openweathermap.org/img/w/${hours.list?.[4]?.weather?.[0]?.icon}.png`}
                      
                    />
                  </td>
                  <td>
                    <img
                      src={`http://openweathermap.org/img/w/${hours.list?.[5]?.weather?.[0]?.icon}.png`}
                    />
                  </td>
                  <td>
                    <img
                      src={`http://openweathermap.org/img/w/${hours.list?.[6]?.weather?.[0]?.icon}.png`}
                    />
                  </td>
                  <td>
                    <img
                      src={`http://openweathermap.org/img/w/${hours.list?.[7]?.weather?.[0]?.icon}.png`}
                    />
                  </td>
                </tr>
                <tr className="hourly-temp">
                  <td>{hours.list?.[0]?.main?.temp} °F</td>
                  <td>{hours.list?.[1]?.main?.temp} °F</td>
                  <td>{hours.list?.[2]?.main?.temp} °F</td>
                  <td>{hours.list?.[3]?.main?.temp} °F</td>
                  <td>{hours.list?.[4]?.main?.temp} °F</td>
                  <td>{hours.list?.[5]?.main?.temp} °F</td>
                  <td>{hours.list?.[6]?.main?.temp} °F</td>
                  <td>{hours.list?.[7]?.main?.temp} °F</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hourly;
