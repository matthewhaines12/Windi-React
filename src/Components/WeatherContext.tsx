import React from "react";

export const WeatherContext = React.createContext({
  city: "",
  temp: "",
  setWeather: (city: string, temp: string) => {},
});

export default WeatherContext;
