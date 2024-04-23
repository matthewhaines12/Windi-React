// Creates the radar map and loads tile layers when toggled

import "../../src/Styles/Radar.css";
import "../../src/Styles/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { useLocation } from "../Components/LocationContext";
import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

function RadarMap() {
  const { locationData } = useLocation();
  const mapRef = useRef<L.Map | null>(null);
  const Temp = useRef<L.TileLayer | null>(null);
  const Clouds = useRef<L.TileLayer | null>(null);
  const Wind = useRef<L.TileLayer | null>(null);
  const Precipitation = useRef<L.TileLayer | null>(null);
  const [state, setState] = React.useState({
    clouds: false,
    temp: false,
    wind: false,
    precipitation: false,
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
      mapRef.current = L.map("map", { minZoom: 3 }).setView([0, 0], 3);

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

    if (state.temp && !Temp.current) {
      Temp.current = L.tileLayer(
        "http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid=51792902640cee7f3338178dbd96604a&fill_bound=true&opacity=0.5&palette=-65:821692;-55:821692;-45:821692;-40:821692;-30:8257db;-20:208cec;-10:20c4e8;0:23dddd;10:c2ff28;20:fff028;25:ffc228;30:fc8014"
      ).addTo(mapRef.current);
    } else if (!state.temp && Temp.current != null) {
      mapRef.current.removeLayer(Temp.current);
      Temp.current = null;
    }

    if (state.clouds && !Clouds.current) {
      Clouds.current = L.tileLayer(
        "http://maps.openweathermap.org/maps/2.0/weather/CL/{z}/{x}/{y}?opacity=0.9&appid=51792902640cee7f3338178dbd96604a"
      ).addTo(mapRef.current);
    } else if (!state.clouds && Clouds.current != null) {
      mapRef.current.removeLayer(Clouds.current);
      Clouds.current = null;
    }

    if (state.wind && !Wind.current) {
      Wind.current = L.tileLayer(
        "https://maps.openweathermap.org/maps/2.0/weather/WND/{z}/{x}/{y}?opacity=0.4&use_norm=true&arrow_step=32&appid=51792902640cee7f3338178dbd96604a"
      ).addTo(mapRef.current);
    } else if (!state.wind && Wind.current != null) {
      mapRef.current.removeLayer(Wind.current);
      Wind.current = null;
    }

    if (state.precipitation && !Precipitation.current) {
      Precipitation.current = L.tileLayer(
        "https://maps.openweathermap.org/maps/2.0/weather/PR0/{z}/{x}/{y}?opacity=0.5&appid=51792902640cee7f3338178dbd96604a"
      ).addTo(mapRef.current);
    } else if (!state.precipitation && Precipitation.current != null) {
      mapRef.current.removeLayer(Precipitation.current);
      Precipitation.current = null;
    }
    console.log("State Update");
  }, [locationData, state]);

  useEffect(() => {
    if (locationData.locations.length > 0) {
      const { lat, lng } = locationData.locations[0];
      mapRef.current!.setView([lat, lng], 10);
    }
    if (mapRef.current !== null && locationData.locations.length > 0) {
      const { lat, lng } = locationData.locations[0];
      mapRef.current.setView([lat, lng], 15);
    }
  }, [locationData]);

  return (
    <div>
      <div id="map" style={{ width: "950px", height: "550px" }}>
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
                label="Wind"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={state.precipitation}
                    onChange={handleChange}
                    name="precipitation"
                  />
                }
                label="Precipitation"
              />
            </FormGroup>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
export default RadarMap;
