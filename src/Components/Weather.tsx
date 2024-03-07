import React, { useEffect, useState } from "react";
import Search from "./Search";
import { WeatherContext } from "./WeatherContext";

interface WeatherProps {
  onWeatherUpdate: (
    city: string,
    temperature: number,
    description: string,
    feelsLike: number
  ) => void;
}

const Weather: React.FC<WeatherProps> = ({ onWeatherUpdate }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(param: string) {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&units=imperial&appid=61e443259796e74aa0220976753f43a6`
      );

      const data = await response.json();
      if (data) {
        setWeatherData(data);
        onWeatherUpdate(
          data.name,
          data.main.temp,
          data.weather[0].description,
          data.main.feels_like
        );
        setLoading(false);
        console.log(data);
      }
    } catch (error) {
      setLoading(false);
      //console.log(error);
    }
  }

  interface SearchProps {
    search: string;
    handleSearch: () => void;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
  }

  function handleSearch() {
    fetchWeatherData(search);
  }

  useEffect(() => {
    if (search) {
      fetchWeatherData(search);
    }
  }, [search]);

  return (
    <WeatherContext.Provider value={{ search, handleSearch, setSearch }}>
      <Search
        search={search}
        handleSearch={handleSearch}
        setSearch={setSearch}
      ></Search>
    </WeatherContext.Provider>
  );
};

export default Weather;
