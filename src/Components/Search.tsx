//import React, { useContext, ChangeEvent } from "react";
//import { WeatherContext } from "./WeatherContext";

//interface SearchProps {
  //search: string;
  //setSearch: React.Dispatch<React.SetStateAction<string>>;
//}

//const Search: React.FC<SearchProps> = ({ search, setSearch }) => {
  //const { setWeather } = useContext(WeatherContext);

  //const fetchWeatherData = (city: string): string => {
    // Implement the logic to fetch weather data for the city
    // and return the temperature as a string
   // return "";
  //};

  //const handleSearch = () => {
    //const temp = fetchWeatherData(search);

    //if (temp) {
      //setWeather(search, temp);
    //} else {
      // Handle the case when the temperature is not available
    //}
  //};

  //return (
    //<div className="search-engine">
      //<input
       // type="text"
        //className="city-search"
        //placeholder="City/Zip..."
        //name="search"
        //value={search}
        //onChange={(event: ChangeEvent<HTMLInputElement>) =>
          //setSearch(event.target.value)
        //}
      ///>
      //<button className="search-button" onClick={handleSearch}>
        //Search
      //</button>
    //</div>
  //);
//};

//export default Search;

import React, {useState} from "react";

const api = {
  key: "51792902640cee7f3338178dbd96604a",
  base: "https://pro.openweathermap.org/geo/1.0/",
};

/*interface LocationData {
lon: number;
lat: number;
}

function Search(){
  const[search, setSearch] = useState("");
  const[Location, setLocation] = useState<LocationData>({
   lon: 0,
   lat: 0,
  });

  const searchPressed = () => {
    fetch(`${api.base}direct?q=${search}&APPID=${api.key}`)
    .then((res) => res.json())
    .then((result: LocationData) => {
      setLocation(result);
    })
    .catch((error) => {
      console.error("Error fetching hourly data:", error);
    });
    };

    var longitude = Location.lon;
    var latitude = Location.lat;

    
  return(
    <div>
       <input
       type="text"
       placeholder="Enter City,State Code,Country Code"
       onChange={(e) => setSearch(e.target.value)}
       />
       <button onClick={searchPressed}>Search</button>
    </div>
  );
}
export default Search; */
interface SearchProps {
  onLocationUpdate: (newLocationData: LocationData) => void;
}
interface LocationData {
  Array: {
    lon: number;
    lat: number;
    // other properties if any
  }[];
}

function Search({ onLocationUpdate } : SearchProps) {
  const [search, setSearch] = useState("");

  const searchPressed = () => {
    fetch(`${api.base}direct?q=${search}&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        onLocationUpdate(result); // Pass the result to the parent component
      })
      .catch((error) => {
        console.error("Error fetching hourly data:", error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter City,State Code,Country Code"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={searchPressed}>Search</button>
    </div>
  );
}

export default Search;