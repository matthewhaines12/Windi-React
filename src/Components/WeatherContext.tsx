import React from "react";

export const WeatherContext = React.createContext({
  city: "",
  temp: "",
  description: "",
  feelsLike: "",
  setWeather: (
    city: string,
    temp: number,
    description: string,
    feelsLike: number
  ) => {},
});

export default WeatherContext;
