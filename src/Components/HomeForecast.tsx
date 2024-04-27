// This file focuses on displaying the 5-day forecast
// For help regarding how this code works, look at the comments within HomeCurrent.tsx

import "../Styles/Home.css";
import { useEffect, useState } from "react";
import { useLocation } from "./LocationContext";
import "../Styles/Daily.css";

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
  const { locationData } = useLocation();
  const { setLocationData } = useLocation();
  const [forecast, setWeatherData] = useState<HomeForecastData | null>(null);

  const formatDate = (timestamp: number | undefined): string => {
    if (!timestamp) return "";

    const date = new Date(timestamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    return formattedDate;
  };

  function Errors(err: { code: any; message: any }) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  function Success(position: { coords: any }) {
    setLocationData({
      locations: [
        { lat: position.coords.latitude, lng: position.coords.longitude },
      ],
    });
    if (locationData.locations[0] && locationData.locations[1]) {
      fetch(
        `${api.base}forecast/daily?lat=${locationData.locations[0]}&lon=${locationData.locations[1]}&APPID=${api.key}&units=imperial`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data);
          console.log(data);
        })
        .catch((error) => console.error("Failed to fetch weather data", error));
    }
  }

  useEffect(() => {
    if (locationData.locations.length > 0) {
      const { lat, lng } = locationData.locations[0];

      fetch(
        `${api.base}forecast/daily?lat=${lat}&lon=${lng}&APPID=${api.key}&units=imperial`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data);
          console.log(data);
        })
        .catch((error) => console.error("Failed to fetch weather data", error));
    } else if (firstRun) {
      var options = {
        highAccuracyEnabled: true,
        timeout: 10000,
        maxAge: 0,
      };

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

  return (
    <div className="forecast">
      <div className="container">
        <div className="middle">
          <table className="daily-outline">
            <thead className="daily-days">
              <tr>
                <th>
                  {forecast?.list?.[1]?.dt && formatDate(forecast.list?.[1]?.dt)}
                </th>
                <th>
                  {forecast?.list?.[2]?.dt && formatDate(forecast.list?.[2]?.dt)}
                </th>
                <th>
                  {forecast?.list?.[3]?.dt && formatDate(forecast.list?.[3]?.dt)}
                </th>
                <th>
                  {forecast?.list?.[4]?.dt && formatDate(forecast.list?.[4]?.dt)}
                </th>
                <th>
                  {forecast?.list?.[5]?.dt && formatDate(forecast.list?.[5]?.dt)}
                </th>
                <th>
                  {forecast?.list?.[6]?.dt && formatDate(forecast.list?.[6]?.dt)}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="daily-items">
                <td>
                  <div className="daily-temp">
                    <p>
                      {Math.round(forecast?.list?.[1]?.temp?.max ?? 0)}°F
                    </p>
                    <img
                      src={`http://openweathermap.org/img/w/${
                        forecast?.list?.[1]?.weather?.[0]?.icon ?? "02d"
                      }.png`}
                    />
                    <p>
                      {Math.round(forecast?.list?.[1]?.temp?.min ?? 0)}°F
                    </p>
                  </div>
                </td>
                <td>
                  <div className="daily-temp">
                    <p>
                      {Math.round(forecast?.list?.[2]?.temp?.max ?? 0)}°F
                    </p>
                    <img
                      src={`http://openweathermap.org/img/w/${
                        forecast?.list?.[2]?.weather?.[0]?.icon ?? "02d"
                      }.png`}
                    />
                    <p>
                      {Math.round(forecast?.list?.[2]?.temp?.min ?? 0)}°F
                    </p>
                  </div>
                </td>
                <td>
                  <div className="daily-temp">
                    <p>
                      {Math.round(forecast?.list?.[3]?.temp?.max ?? 0)}°F
                    </p>
                    <img
                      src={`http://openweathermap.org/img/w/${
                        forecast?.list?.[3]?.weather?.[0]?.icon ?? "02d"
                      }.png`}
                    />
                    <p>
                      {Math.round(forecast?.list?.[3]?.temp?.min ?? 0)}°F
                    </p>
                  </div>
                </td>
                <td>
                  <div className="daily-temp">
                    <p>
                      {Math.round(forecast?.list?.[4]?.temp?.max ?? 0)}°F
                    </p>
                    <img
                      src={`http://openweathermap.org/img/w/${
                        forecast?.list?.[4]?.weather?.[0]?.icon ?? "02d"
                      }.png`}
                    />
                    <p>
                      {Math.round(forecast?.list?.[4]?.temp?.min ?? 0)}°F
                    </p>
                  </div>
                </td>
                <td>
                  <div className="daily-temp">
                    <p>
                      {Math.round(forecast?.list?.[5]?.temp?.max ?? 0)}°F
                    </p>
                    <img
                      src={`http://openweathermap.org/img/w/${
                        forecast?.list?.[5]?.weather?.[0]?.icon ?? "02d"
                      }.png`}
                    />
                    <p>
                      {Math.round(forecast?.list?.[5]?.temp?.min ?? 0)}°F
                    </p>
                  </div>
                </td>
                <td>
                  <div className="daily-temp">
                    <p>
                      {Math.round(forecast?.list?.[6]?.temp?.max ?? 0)}°F
                    </p>
                    <img
                      src={`http://openweathermap.org/img/w/${
                        forecast?.list?.[6]?.weather?.[0]?.icon ?? "02d"
                      }.png`}
                    />
                    <p>
                      {Math.round(forecast?.list?.[6]?.temp?.min ?? 0)}°F
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HomeForecast;