import React, { useState } from "react";
import { useLocation } from "../Components/LocationContext";
import "../Styles/Navbar.css";

const api = {
  key: "51792902640cee7f3338178dbd96604a",
  base: "https://pro.openweathermap.org/geo/1.0/",
};

function Search() {
  const [search, setSearch] = useState("");
  const { setLocationData } = useLocation();

  const searchPressed = () => {
    fetch(`${api.base}direct?q=${search}&limit=1&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        if (result && result.length > 0) {
          setLocationData({
            locations: [{ lat: result[0].lat, lon: result[0].lon }],
          });
        } else {
          console.log("No results found.");
        }
      })
      .catch((error) => console.error("Error fetching location data:", error));
  };

  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        placeholder="Enter City..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="search-btn" onClick={searchPressed}>
        Search
      </button>
    </div>
  );
}

export default Search;
