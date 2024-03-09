import React from "react";
// import { WeatherContext } from "../Components/WeatherContext";
import "../Components/Home.css";
import { FaLocationArrow } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa";
import { CiCloudOn } from "react-icons/ci";

interface HomeProps {
  city: string;
  temperature: number;
  description: string;
  feelsLike: number;
}

const Home: React.FC<HomeProps> = ({
  city,
  temperature,
  description,
  feelsLike,
}) => {
  return (
    <div className="home">
      <div className="container">
        <div className="top">
          <div className="location">
            <FaLocationArrow className="location-icon" />
            <p>Altoona{city}</p>
          </div>
          <div className="temp">
            <h1>6{Math.round(temperature)}°F</h1>
          </div>
          <div className="description">
            <p>Cloudy{description}</p>
          </div>
        </div>
        <div className="middle">
          <div>
            <ul className="days-list">
              <li>
                <CiCloudOn className="cloud-5day" />
                <span>Sat</span>
                <span className="day-temp">65°F</span>
              </li>
              <li>
                <CiCloudOn className="cloud-5day" />
                <span>Sun</span>
                <span className="day-temp">65°F</span>
              </li>
              <li>
                <CiCloudOn className="cloud-5day" />
                <span>Mon</span>
                <span className="day-temp">67°F</span>
              </li>
              <li>
                <CiCloudOn className="cloud-5day" />
                <span>Tue</span>
                <span className="day-temp">62°F</span>
              </li>
              <li>
                <CiCloudOn className="cloud-5day" />
                <span>Wed</span>
                <span className="day-temp">61°F</span>
              </li>
            </ul>
            <div />
          </div>
          <div className="bottom">
            <div className="day-info">
              <div>
                <span className="title">PRECIPITATION </span>
                <span className="value">0 %</span>
              </div>
              <div>
                <span className="title">HUMIDITY </span>
                <span className="value">22 %</span>
              </div>
              <div>
                <span className="title">WIND SPEED </span>
                <span className="value">4 mp/h</span>
              </div>
              <div>
                <span className="title">FEELS LIKE </span>
                <span className="value">{Math.round(feelsLike)}°F</span>
              </div>
              <div>
                <span className="title">WIND SPEED </span>
                <span className="value">4 mp/h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
