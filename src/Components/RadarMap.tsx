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
    /*else if (firstRun) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationData({
            locations: [{ lat: latitude, lng: longitude }],
          });

          if (mapRef.current !== null) {
            mapRef.current.setView([latitude, longitude], 15);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );

      firstRun = false;
    }*/
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

/*function RadarMap(): JSX.Element {
  const mapRef = useRef<L.Map | null>(null);
  const { locationData } = useLocation();

  useEffect(() => {
    if (!mapRef.current) {
      // Create the map
      mapRef.current = L.map('map').setView([0, 0], 2);
 
      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    // Fetch weather data
    axios.get<string>('http://maps.openweathermap.org/maps/2.0/weather/TA2/0/0/0?appid=51792902640cee7f3338178dbd96604a')
      .then(response => {
        // Log the URL received from the API
        console.log("Weather image URL:", response.data);
        
        // Extract the URL of the weather image from the response data
        const imageUrl: string = response.data;

        // Create an image overlay using the URL
        L.imageOverlay('http://maps.openweathermap.org/maps/2.0/weather/TA2/0/0/0?appid=51792902640cee7f3338178dbd96604a', [[-90, -180], [90, 180]]).addTo(mapRef.current!);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });

      mapRef.current.setView(locationData.locations[0], 10);

    return () => {
      // Clean up the map instance when component unmounts
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);


  return <div id="map" style={{ width: "100%", height: "600px" }} />;
}

export default RadarMap;*/

/*
    var map: any;
    var firstRun = true;
    const { locationData } = useLocation(); // This uses the context we've set up
    const { setLocationData } = useLocation();
    useEffect(() => {
        if (locationData.locations.length > 0) {
          
        } else if (firstRun) {

          var options = {
            highAccuracyEnabled: true,
            timeout: 10000,
            maxAge: 0,
          };
    
          function Success(position: { coords: any }) {
    
            setLocationData({locations: [{ lat: position.coords.latitude, lng: position.coords.longitude }],});


            map = L.map('map').setView(locationData.locations[0], 13);

            axios.get('http://maps.openweathermap.org/maps/2.0/weather/TA2/13/0/0?appid=51792902640cee7f3338178dbd96604a')
            .then(response => {
              L.tileLayer(response.data, {
              attribution: '© OpenWeatherMap contributors'
            }).addTo(map);
              //L.imageOverlay(response.data, [[-90, -180], [90, 180]]).addTo(map);
            })
            .catch(error => {
              console.error('Error fetching weather data:', error);
            });
          }
    
          function Errors(err: { code: any; message: any }) {
            console.warn(`ERROR(${err.code}): ${err.message}`); //Basic error function, not much to explain
          }
    
          if (navigator.geolocation) {
            navigator.permissions.query({ name: "geolocation" }).then((result) => {
              console.log(result);
              if (result.state === "granted") {
                console.log(`LOCATION REQUEST 1`);
                navigator.geolocation.getCurrentPosition(Success, Errors, options);
              } else if (result.state === "prompt") {
                console.log(`LOCATION REQUEST 2`);
                navigator.geolocation.getCurrentPosition(Success, Errors, options);
              } else if (result.state === "denied") {
                //If denied then you have to show instructions to enable location
              }
            });
          } else {
            console.log("Geolocation not supported");
          }
    
          firstRun = false;
        }
      }, [locationData]);

  return(
    <div id="map" style={{ width: '100%', height: '90%' }}></div>
  );*/

/*var firstRun = true;

  function RadarMap(): JSX.Element {
    const { locationData } = useLocation(); // This uses the context we've set up
    const { setLocationData } = useLocation();
    const mapRef = useRef<L.Map | null>(null);

    useEffect(() => {
      if (!mapRef.current) {
        // Create the map
        mapRef.current = L.map('map').setView([0, 0], 2);
   
        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(mapRef.current);
      }
  
      // Fetch weather data
      axios.get<string>('http://maps.openweathermap.org/maps/2.0/weather/TA2/0/0/0?appid=51792902640cee7f3338178dbd96604a')
        .then(response => {
          // Log the URL received from the API
          console.log("Weather image URL:", response.data);
          
          // Extract the URL of the weather image from the response data
          const imageUrl: string = response.data;
  
          // Create an image overlay using the URL
          L.imageOverlay('http://maps.openweathermap.org/maps/2.0/weather/TA2/0/0/0?appid=51792902640cee7f3338178dbd96604a', [[-90, -180], [90, 180]]).addTo(mapRef.current!);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
  
      if (locationData.locations.length > 0) {
        const { lat, lng } = locationData.locations[0];
        mapRef.current.setView([lat, lng], 10);
          }
      else if (firstRun) {
        var latlong: Array<number> = [0.0, 0.0];
      }

        var options = {
          highAccuracyEnabled: true,
          timeout: 10000,
          maxAge: 0,
        };
  
        function Success(position: { coords: any }) {
          //console.log(`LOCATION RECEIVED`);
          //latlong[0] = position.coords.latitude;
          //latlong[1] = position.coords.longitude;
          setLocationData({locations: [{ lat: position.coords.latitude, lng: position.coords.longitude }],});
  
          mapRef?.current?.setView([locationData.locations[0], locationData.locations[1]], 10);
          
        }
  
        function Errors(err: { code: any; message: any }) {
          console.warn(`ERROR(${err.code}): ${err.message}`); //Basic error function, not much to explain
        }
  
        if (navigator.geolocation) {
          navigator.permissions.query({ name: "geolocation" }).then((result) => {
            console.log(result);
            if (result.state === "granted") {
              console.log(`LOCATION REQUEST 1`);
              navigator.geolocation.getCurrentPosition(Success, Errors, options);
            } else if (result.state === "prompt") {
              console.log(`LOCATION REQUEST 2`);
              navigator.geolocation.getCurrentPosition(Success, Errors, options);
            } else if (result.state === "denied") {
              //If denied then you have to show instructions to enable location
            }
          });
        } else {
          console.log("Geolocation not supported");
        }
  
        firstRun = false;
      }
    }, [locationData]); // Dependency array includes locationData to re-run effect when locationData changes
  
    // Ensure the rendering logic below does not contain undefined references
  
    return <div id="map" style={{ width: "100%", height: "600px" }};
  }
  
  export default RadarMap;*/
