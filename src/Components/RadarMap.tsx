// Creates the radar map and loads tile layers when toggled

import "../../src/Styles/Radar.css";
import "../../src/Styles/leaflet.css";
import L, {Control} from "leaflet";
import { useEffect, useRef } from "react";
import { useLocation } from "../Components/LocationContext";
import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

function Key(map: L.Map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Temperature Key</h4>";
  div.innerHTML += '<i style="background: #ff0000"></i><span>>~104</span><br>';
  div.innerHTML += '<i style="background: #FFA500"></i><span>~86</span><br>';
  div.innerHTML += '<i style="background: #00ff00"></i><span>~68</span><br>';
  div.innerHTML += '<i style="background: #00ffff"></i><span>~50</span><br>';
  div.innerHTML += '<i style="background: #0000ff"></i><span>~32</span><br>';
  div.innerHTML += '<i style="background: #9900ff"></i><span>~5</span><br>';
  div.innerHTML += '<i style="background: #ff00ff"></i><span><-20</span><br>';
  div.innerHTML += '<h4>Precipitation Key</h4>';
  div.innerHTML += '<i style="background: #64cd00 "></i><span>Light Rain</span><br>';
  div.innerHTML += '<i style="background: #FFC300 "></i><span>Moderate Rain</span><br>';
  div.innerHTML += '<i style="background: #C70039 "></i><span>Heavy Rain</span><br>';
  return div;
};

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
  const legend: L.Control = new Control({ position: "bottomright" });
  legend.onAdd = () => Key(mapRef.current!);

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

      legend.addTo(mapRef.current);
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
        "http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid=51792902640cee7f3338178dbd96604a&fill_bound=true&opacity=0.5&palette=-30:ff00ff;-15:9900ff;0:0000ff;10:00ffff;20:00ff00;40:ff0000"
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
        <div className="map-legend">
          
        </div>
      </div>
    </div>
  );
}
export default RadarMap;
