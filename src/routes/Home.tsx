import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import CurrentWeather from "../../src/Components/CurrentWeather"

function Home() {

  CurrentWeather().then((res) =>{ //This is so busted
    const currWeather = res;
  });

  // filler info for now
  return (
    <div className="home">
      <div className="container">
        <div className="top">
          <div className="location">
            <p>Altoona</p>
          </div>
          <div className="temp">
            <h1>{currWeather.data}°F</h1>
            <h1>63°F</h1>
          </div>
          <div className="description">
            <p>Cloudy</p>
          </div>
        </div>
        <div className="middle">
          <table>
            <caption>5-Day Forecast</caption>
            <thead>
              <tr>
                <th>Day</th>
                <th>Temperature</th>
                <th>Weather</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Monday</td>
                <td>72°F</td>
                <td>Sunny</td>
              </tr>
              <tr>
                <td>Tuesday</td>
                <td>68°F</td>
                <td>Partly Cloudy</td>
              </tr>
              <tr>
                <td>Wednesday</td>
                <td>70°F</td>
                <td>Rainy</td>
              </tr>
              <tr>
                <td>Thursday</td>
                <td>75°F</td>
                <td>Cloudy</td>
              </tr>
              <tr>
                <td>Friday</td>
                <td>78°F</td>
                <td>Sunny</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bottom">
          <div className="feels">
            <p>55°F</p>
            <p>Feels Like</p>
          </div>
          <div className="uv">
            <p>4</p>
            <p>UV Index</p>
          </div>
          <div className="wind">
            <p>5mph</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;