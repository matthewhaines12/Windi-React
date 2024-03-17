import "../Styles/Hourly.css";
import { useState, useEffect } from "react";
//import HomeForecast from "../Components/HomeForecast";
import { useLocation } from "../Components/LocationContext";

const api = {
  key: "51792902640cee7f3338178dbd96604a",
  base: "https://pro.openweathermap.org/data/2.5/",
};

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

var firstRun = true;

function HomeHourly() {
  const { locationData } = useLocation(); // This uses the context we've set up
  const { setLocationData } = useLocation();
  const [hours, setWeatherData] = useState<HourlyData | null>(null); // Initialize weatherData state

  const convertToEST = (utcTime: string): string => {
    const utcDate = new Date(utcTime.replace(/ /, "T") + "Z");
    const estDate = new Date(
      utcDate.toLocaleString("en-US", { timeZone: "America/New_York" })
    );
    return estDate.toLocaleString();
  };

  useEffect(() => {
    if (locationData.locations.length > 0) {
      const { lat, lon } = locationData.locations[0];
      // Use the lat and lon to fetch weather data
      fetch(
        `${api.base}forecast/hourly?lat=${lat}&lon=${lon}&APPID=${api.key}&units=imperial`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data); // Update state with fetched weather data
          console.log(data); // Logging for debugging purposes
        })
        .catch((error) => console.error("Failed to fetch weather data", error));
    } else if (firstRun) {
      var latlong: Array<number> = [0.0, 0.0];

      var options = {
        highAccuracyEnabled: true,
        timeout: 10000,
        maxAge: 0,
      };

      function Success(position: { coords: any }) {
        //console.log(`LOCATION RECEIVED`);
        //latlong[0] = position.coords.latitude;
        //latlong[1] = position.coords.longitude;
        setLocationData({locations: [{ lat: position.coords.latitude, lon: position.coords.longitude }],});

        fetch(
          `${api.base}forecast/hourly?lat=${locationData.locations[0]}&lon=${locationData.locations[1]}&APPID=${api.key}&units=imperial`
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
    <>
      <div className="hourly">
        <div className="container">
          <div className="top">
            <h3 className="hourly-title">Hourly Forecast</h3>
          </div>
          <div className="middle">
            <table className="hourly-outline">
              <thead className="hourly-times">
                <tr>
                  <th>
                    {hours?.list?.[0]?.dt_txt &&
                      convertToEST(hours.list[0].dt_txt)}
                  </th>
                  <th>
                    {hours?.list?.[1]?.dt_txt &&
                      convertToEST(hours.list[1].dt_txt)}
                  </th>
                  <th>
                    {hours?.list?.[2]?.dt_txt &&
                      convertToEST(hours.list[2].dt_txt)}
                  </th>
                  <th>
                    {hours?.list?.[3]?.dt_txt &&
                      convertToEST(hours.list[3].dt_txt)}
                  </th>
                  <th>
                    {hours?.list?.[4]?.dt_txt &&
                      convertToEST(hours.list[4].dt_txt)}
                  </th>
                  <th>
                    {hours?.list?.[5]?.dt_txt &&
                      convertToEST(hours.list[5].dt_txt)}
                  </th>
                  <th>
                    {hours?.list?.[6]?.dt_txt &&
                      convertToEST(hours.list[6].dt_txt)}
                  </th>
                  <th>
                    {hours?.list?.[7]?.dt_txt &&
                      convertToEST(hours.list[7].dt_txt)}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hourly-images">
                  <td>
                    <img
                      src={`http://openweathermap.org/img/w/${hours?.list?.[0]?.weather?.[0]?.icon}.png`}
                    />
                  </td>
                  <td>
                    <img
                      src={`http://openweathermap.org/img/w/${hours?.list?.[1]?.weather?.[0]?.icon}.png`}
                    />
                  </td>
                  <td>
                    <img
                      src={`http://openweathermap.org/img/w/${hours?.list?.[2]?.weather?.[0]?.icon}.png`}
                    />
                  </td>
                  <td>
                    <img
                      src={`http://openweathermap.org/img/w/${hours?.list?.[3]?.weather?.[0]?.icon}.png`}
                    />
                  </td>
                  <td>
                    <img
                      src={`http://openweathermap.org/img/w/${hours?.list?.[4]?.weather?.[0]?.icon}.png`}
                    />
                  </td>
                  <td>
                    <img
                      src={`http://openweathermap.org/img/w/${hours?.list?.[5]?.weather?.[0]?.icon}.png`}
                    />
                  </td>
                  <td>
                    <img
                      src={`http://openweathermap.org/img/w/${hours?.list?.[6]?.weather?.[0]?.icon}.png`}
                    />
                  </td>
                  <td>
                    <img
                      src={`http://openweathermap.org/img/w/${hours?.list?.[7]?.weather?.[0]?.icon}.png`}
                    />
                  </td>
                </tr>
                <tr className="hourly-temp">
                  <td>{Math.round(hours?.list?.[0]?.main?.temp ?? 0)} °F</td>
                  <td>{Math.round(hours?.list?.[1]?.main?.temp ?? 0)} °F</td>
                  <td>{Math.round(hours?.list?.[2]?.main?.temp ?? 0)} °F</td>
                  <td>{Math.round(hours?.list?.[3]?.main?.temp ?? 0)} °F</td>
                  <td>{Math.round(hours?.list?.[4]?.main?.temp ?? 0)} °F</td>
                  <td>{Math.round(hours?.list?.[5]?.main?.temp ?? 0)} °F</td>
                  <td>{Math.round(hours?.list?.[6]?.main?.temp ?? 0)} °F</td>
                  <td>{Math.round(hours?.list?.[7]?.main?.temp ?? 0)} °F</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeHourly;
