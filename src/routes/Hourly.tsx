import React from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
<<<<<<< Updated upstream

function Hourly() {
  return (
    <div className="hourly">
      <h1>Hourly</h1>
      <TiWeatherPartlySunny className="page-icon" />
    </div>
=======
import Weather from "../Components/Weather";

function Hourly() {
  return (
    <>
      <div className="home">
        <div className="container">
          <div className="top">
            <h3 className="hourly-title">Hourly Forecast</h3>
          </div>
          <div className="middle">
            <table className="hourly-outline">
              <thead className="hourly-times">
                <tr>
                  <th>4:30 pm</th>
                  <th>5:30pm</th>
                  <th>6:30pm</th>
                  <th>7:30pm</th>
                  <th>8:30pm</th>
                  <th>9:30pm</th>
                  <th>10:30pm</th>
                  <th>11:30pm</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hourly-images">
                  <td>
                    <img
                      src="./Images/warm-weather.png"
                      alt="warm-weather-img"
                    />
                  </td>
                  <td>
                    <img
                      src="./Images/warm-weather.png"
                      alt="warm-weather-img"
                    />
                  </td>
                  <td>
                    <img
                      src="./Images/warm-weather.png"
                      alt="warm-weather-img"
                    />
                  </td>
                  <td>
                    <img
                      src="./Images/warm-weather.png"
                      alt="warm-weather-img"
                    />
                  </td>
                  <td>
                    <img
                      src="./Images/warm-weather.png"
                      alt="warm-weather-img"
                    />
                  </td>
                  <td>
                    <img
                      src="./Images/warm-weather.png"
                      alt="warm-weather-img"
                    />
                  </td>
                  <td>
                    <img
                      src="./Images/warm-weather.png"
                      alt="warm-weather-img"
                    />
                  </td>
                  <td>
                    <img
                      src="./Images/warm-weather.png"
                      alt="warm-weather-img"
                    />
                  </td>
                </tr>
                <tr className="hourly-temp">
                  <td>72°F</td>
                  <td>68°F</td>
                  <td>68°F</td>
                  <td>68°F</td>
                  <td>68°F</td>
                  <td>68°F</td>
                  <td>68°F</td>
                  <td>68°F</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
>>>>>>> Stashed changes
  );
}

export default Hourly;
