// Creates the radar map and loads tile layers when toggled

import "../../src/Styles/Radar.css";
import "../../src/Styles/leaflet.css";
import L, {Control, map} from "leaflet";
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

var Stadia_AlidadeSmoothDark = L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}",
        {
          minZoom: 0,
          maxZoom: 20,
          attribution:
            '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          ext: "png", //Not an error, but will cause an error if deleted
        }
      )
var Main_Map = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
});

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
    mapType: false,
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
  const defaultLocation = { lat: 40.7128, lng: -74.0060 }; 


  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", { minZoom: 3 }).setView([defaultLocation.lat, defaultLocation.lng], 10); // Set default view to New York
      //  mapRef.current = L.map("map", { minZoom: 3 }).setView([0, 0], 3);

      Main_Map.addTo(mapRef.current);

      legend.addTo(mapRef.current);
    }
    
    if(mapRef.current && !state.mapType) { //Refreshes the map when the page is refreshed (and also on each layer toggle)
      Main_Map.remove();
      Main_Map.addTo(mapRef.current);
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

    if(state.mapType) {
      mapRef.current.removeLayer(Main_Map);
      Stadia_AlidadeSmoothDark.addTo(mapRef.current).bringToBack();
    }else if (!state.mapType) {
      Main_Map.addTo(mapRef.current).bringToBack();
      Stadia_AlidadeSmoothDark.remove();
    }

    if (state.temp && !Temp.current) {
      Temp.current = L.tileLayer(
        "http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid=51792902640cee7f3338178dbd96604a&fill_bound=true&opacity=0.7&palette=-30:ff00ff;0:0000ff;10:00ffff;20:00ff00;40:ff0000"
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
  }, [locationData, state]);

  useEffect(() => {
    if (mapRef.current !== null && locationData.locations.length === 0) {
      mapRef.current.setView([defaultLocation.lat, defaultLocation.lng], 10); // Set default view to New York
    }
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
            <FormLabel component="legend">Map</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.mapType}
                    onChange={handleChange}
                    name="mapType"
                  />
                }
                label="Dark Mode"
              />
            </FormGroup>
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
