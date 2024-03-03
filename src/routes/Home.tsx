import React from "react";
import { createRoot } from "react-dom/client";
import {createBrowserRouter, RouterProvider,Route,Link,Outlet,} from "react-router-dom";
import "./App.css";
import "./Home.css"


function Home() {
  return (
    <div className="home">
      <div className="container">
        <div className="top">
          <div className="location">
            <p>Altoona</p>
          </div>
          <div className="temp">
            <h1>60°F</h1>
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