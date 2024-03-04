<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState , useEffect} from "react";
import { AiOutlineHome } from "react-icons/ai";
import CurrentWeather from "../../src/Components/CurrentWeather"

/*
I tried separating this into a a standalone function to call it within a promise, but for some reason I was having
some trouble with hooks. Possibly the useEffect() in Home()?
*/
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

  

  useEffect(() =>{
    CurrentWeather()
    .then(axiosResponse => {
      output = displayPage(axiosResponse);
    })
    .catch(error => {
      console.log(error)
    });
  }, [])

  return output;
}

export default Home;

/*
USE THIS IF YOU NEED THE ELEMENTS AND BACKGROUND TO REAPPEAR----------------------------------------------------------------------------

Matthew's original code:

import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
// import CurrentWeather from "./Components/CurrentWeather.tsx"  // why error here??
=======
=======
>>>>>>> parent of 566aeec (home screen attempt)
import React from "react";
import { createRoot } from "react-dom/client";
import {createBrowserRouter, RouterProvider,Route,Link,Outlet,} from "react-router-dom";
import "./App.css";
import "./Home.css"

<<<<<<< HEAD
>>>>>>> parent of 566aeec (home screen attempt)
=======
>>>>>>> parent of 566aeec (home screen attempt)

function Home() {
  return (
    <div className="home">
      <div className="container">
        <div className="top">
          <div className="location">
            <p>Altoona</p>
          </div>
          <div className="temp">
<<<<<<< HEAD
<<<<<<< HEAD
//            { <h1>{currWeather}°F</h1> This definitely wont work }
            <h1>63°F</h1>
=======
            <h1>60°F</h1>
>>>>>>> parent of 566aeec (home screen attempt)
=======
            <h1>60°F</h1>
>>>>>>> parent of 566aeec (home screen attempt)
          </div>
          <div className="description">
            <p>Cloudy</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p>55°F</p>
          </div>
          <div className="uv">
            <p>UV Index 4</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
*/