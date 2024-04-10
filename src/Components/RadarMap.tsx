import "../../src/Styles/Radar.css";
import "../../src/Styles/leaflet.css";
import L, { marker } from "leaflet";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "../Components/LocationContext";
import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
import Popup from "./Popup";

let firstRun = true;

function RadarMap() {
  //const { locationData, setLocationData } = useLocation(); // Destructure both values and functions from the context
  const { locationData } = useLocation(); // This uses the context we've set up
  const { setLocationData } = useLocation();
  const mapRef = useRef<L.Map | null>(null);
  const Temp = useRef<L.ImageOverlay | null>(null);
  const Clouds = useRef<L.ImageOverlay | null>(null);
  const Wind = useRef<L.ImageOverlay | null>(null);
  const [state, setState] = React.useState({
    clouds: false,
    temp: false,
    wind: false,
  });
  const markerRef = useRef<L.Marker | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map
      mapRef.current = L.map("map").setView([0, 0], 2);

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }

    if (locationData.locations.length > 0) {
      const { lat, lng } = locationData.locations[0];
      const customMarkerIcon = L.icon({
        iconUrl: "/Images/map-marker.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng], {
          icon: customMarkerIcon,
        }).addTo(mapRef.current);
      }
    }

    const weatherMapURL =
      "http://maps.openweathermap.org/maps/2.0/weather/TA2/0/0/0?appid=51792902640cee7f3338178dbd96604a";

    if (state.temp && !Temp.current) {
      // Fetch and display weather data as a map overlay
      axios
        .get(weatherMapURL)
        .then((response) => {
          const imageUrl = response.data; // Assuming this is the direct URL to the image
          if (mapRef.current) {
            Temp.current = L.imageOverlay(weatherMapURL, [
              [-90, -180],
              [90, 180],
            ]);
            Temp.current.addTo(mapRef.current);
          }
        })
        .catch((error) => console.error("Error fetching weather data:", error));
    } else if (!state.temp && Temp.current != null) {
      mapRef.current.removeLayer(Temp.current);
      Temp.current = null;
    }

    const weatherMapURL2 =
      "http://maps.openweathermap.org/maps/2.0/weather/CL/0/0/0?opacity=0.9&appid=51792902640cee7f3338178dbd96604a";

    if (state.clouds && !Clouds.current) {
      // Fetch and display weather data as a map overlay
      axios
        .get(weatherMapURL2)
        .then((response) => {
          const imageUrl = response.data; // Assuming this is the direct URL to the image
          if (mapRef.current) {
            Clouds.current = L.imageOverlay(weatherMapURL2, [
              [-90, -180],
              [90, 180],
            ]);
            Clouds.current.addTo(mapRef.current);
          }
        })
        .catch((error) => console.error("Error fetching weather data:", error));
    } else if (!state.clouds && Clouds.current != null) {
      mapRef.current.removeLayer(Clouds.current);
      Clouds.current = null;
    }

    const weatherMapURL3 =
      "https://maps.openweathermap.org/maps/2.0/weather/PR0/0/0/0/?appid=51792902640cee7f3338178dbd96604a";

    if (state.wind && !Wind.current) {
      // Fetch and display weather data as a map overlay
      axios
        .get(weatherMapURL3)
        .then((response) => {
          const imageUrl = response.data; // Assuming this is the direct URL to the image
          if (mapRef.current) {
            Wind.current = L.imageOverlay(weatherMapURL3, [
              [-90, -180],
              [90, 180],
            ]);
            Wind.current.addTo(mapRef.current);
          }
        })
        .catch((error) => console.error("Error fetching weather data:", error));
    } else if (!state.wind && Wind.current != null) {
      mapRef.current.removeLayer(Wind.current);
      Wind.current = null;
    }

    // Update map view if there are locations available
    if (locationData.locations.length > 0) {
      const { lat, lng } = locationData.locations[0];
      mapRef.current.setView([lat, lng], 10);
    }
    if ((mapRef.current !== null) && (locationData.locations.length > 0)) {
      const { lat, lng } = locationData.locations[0];
      mapRef.current.setView([lat, lng], 15);
    }
  }, [locationData, state]); // Adding setLocationData to the dependency array as it's used inside the effect

  return (
    <div>
      <div id="map" style={{ width: "950px", height: "550px" }}></div>
      <div className="switch-container">
        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend">Layers</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={state.clouds}
                  onChange={handleChange}
                  name="clouds"
                />
              }
              label="Cloud Coverage"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.temp}
                  onChange={handleChange}
                  name="temp"
                />
              }
              label="Temperature"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={state.wind}
                  onChange={handleChange}
                  name="wind"
                />
              }
              label="Precipitation"
            />
          </FormGroup>
        </FormControl>
      </div>
    </div>
  );
}
export default RadarMap;