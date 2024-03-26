import "../../src/Styles/Radar.css";
import "../../src/Styles/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import axios from "axios";

function RadarMap(): JSX.Element {
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
        L.imageOverlay(imageUrl, [[-90, -180], [90, 180]]).addTo(mapRef.current!);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });

    return () => {
      // Clean up the map instance when component unmounts
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '600px' }} />;
}

export default RadarMap;


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