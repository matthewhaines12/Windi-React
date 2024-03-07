import React, { useContext, ChangeEvent } from "react";
import { WeatherContext } from "./WeatherContext";

interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ search, setSearch }) => {
  const { setWeather } = useContext(WeatherContext);

  const fetchWeatherData = (city: string): string => {
    // Implement the logic to fetch weather data for the city
    // and return the temperature as a string
    return "";
  };

  const handleSearch = () => {
    const temp = fetchWeatherData(search);

    if (temp) {
      setWeather(search, temp);
    } else {
      // Handle the case when the temperature is not available
    }
  };

  return (
    <div className="search-engine">
      <input
        type="text"
        className="city-search"
        placeholder="City/Zip..."
        name="search"
        value={search}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSearch(event.target.value)
        }
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
