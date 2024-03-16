import "../Styles/Home.css";
import { FaLocationArrow } from "react-icons/fa";
import HomeForecast from "./HomeForecast";
import { useEffect, useState } from "react";
import { useLocation } from "./LocationContext";

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

interface country {
  country: string;
}

interface HomeData {
  weather: Weather[];
  main: Main;
  wind: Wind;
  name: string;
  sys: country;
  // Add other properties if needed
}

const api = {
  key: "51792902640cee7f3338178dbd96604a",
  base: "https://pro.openweathermap.org/data/2.5/",
};

var firstRun = true;

function HomeCurrentWeather() {
  const { locationData } = useLocation(); // This uses the context we've set up
  const [home, setWeatherData] = useState<HomeData | null>(null); // Initialize weatherData state

  

  useEffect(() => {
    if (locationData.locations.length > 0) {
      const { lat, lon } = locationData.locations[0];
      // Use the lat and lon to fetch weather data
      fetch(
        `${api.base}weather?lat=${lat}&lon=${lon}&appid=${api.key}&units=imperial`
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
            `${api.base}weather?lat=${latlong[0]}&lon=${latlong[1]}&appid=${api.key}&units=imperial`
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
    <div className="home">
      <div className="container">
        <div className="top">
          <div className="location">
            <FaLocationArrow className="location-icon" />
            <p>{home?.name}</p>
            <p>, {home?.sys?.country}</p>
          </div>
          <div className="temp">
            <h1>
              {`${Math.round(Number(home?.main?.temp))}°F` || "Loading..."}
            </h1>
          </div>
          <div className="description">
            <p>{home?.weather?.[0]?.description}</p>
          </div>
        </div>
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
                  {home?.main?.temp_min}°F'/{home?.main?.temp_max}°F
                </span>
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
}
export default HomeCurrentWeather;
