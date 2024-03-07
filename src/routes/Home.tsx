<<<<<<< Updated upstream
import React from "react";
import { AiOutlineHome } from "react-icons/ai";

function Home() {
  return (
    <div className="home">
      <h1>Home</h1>
      <AiOutlineHome className="page-icon" />
=======
// import React, { useState, useEffect } from "react";
// import { AiOutlineHome } from "react-icons/ai";
// import getWeather from "../Components/FetchCurrent";
// import Weather from "../Components/Weather";
// import { WeatherContext } from "../Components/WeatherContext";

/*
I tried separating this into a a standalone function to call it within a promise, but for some reason I was having
some trouble with hooks. Possibly the useEffect() in Home()?
*/
/*
function displayPage(currWeather: any){

  return (
      <div className="home">
        <div className="container">
          <div className="top">
            <div className="location">
              <p>Altoona</p>
            </div>
            <div className="temp">
              <h1>{currWeather.data.temp}°F</h1>
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
var output: JSX.Element;
function Home() {
  var weather: any;
  weather = await CurrentWeather();
  return displayPage(weather);

  //useEffect(() =>{
  //  CurrentWeather()
  //  .then(axiosResponse => {
  //    output = displayPage(axiosResponse);
  //  })
  //  .catch(error => {
  //    console.log(error)
  //  });
  //}, [])
  //
  //return output;
}

export default Home;
*/
//USE THIS IF YOU NEED THE ELEMENTS AND BACKGROUND TO REAPPEAR----------------------------------------------------------------------------

//Matthew's original code:

import React from "react";
import { WeatherContext } from "../Components/WeatherContext";

interface HomeProps {
  city: string;
  temperature: number;
}

const Home: React.FC<HomeProps> = ({ city, temperature }) => {
  return (
    <div className="home">
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{city}</p>
          </div>
          <div className="temp">
            <h1>{temperature}°F</h1>
          </div>
          <div className="description">
            <p>Clouds</p>
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
>>>>>>> Stashed changes
    </div>
  );
};

export default Home;