import { useState } from "react";
import { useLocation } from "../Components/LocationContext";
import "../Styles/Navbar.css";

const api = {
  key: "51792902640cee7f3338178dbd96604a",
  base: "https://pro.openweathermap.org/geo/1.0/",
};

// Separate function to fetch data
const fetchData = async (search: any) => {
  try {
    const response = await fetch(`${api.base}direct?q=${search}&limit=1&appid=${api.key}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching location data:", error);
    throw error;
  }
};


function Search() {
  const [search, setSearch] = useState<string>("");
  const { setLocationData } = useLocation();

  const searchPressed = async () => {
    try {
      const result = await fetchData(search);
      if (result && result.length > 0) {
        setLocationData({
          locations: [{ lat: result[0].lat, lng: result[0].lon }],
        });
      } else {
        console.log("No results found.");
      }
    } catch (error) {
      console.error("Error handling search:", error);
    }
  };
  
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' || e.key == 'Return') {
      searchPressed();
    }
  };

  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        placeholder="Enter City..."
        value={search}
        onKeyDown={handleKeyDown}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="search-btn" onClick={searchPressed}>
        Search
      </button>
    </div>
  );
}

export default Search;
