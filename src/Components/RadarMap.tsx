import "../../src/Styles/Radar.css";
import "../../src/Styles/leaflet.css";
import L, { TileLayer } from "leaflet";
import { useLocation } from "./LocationContext";
import { useEffect } from "react";
import { MapContainer } from "react-leaflet";


//http://maps.openweathermap.org/maps/2.0/weather/TA2/0/0/0?appid=51792902640cee7f3338178dbd96604a

function RadarMap(){
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

            L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/TA2/0/0/0?appid=51792902640cee7f3338178dbd96604a', {
              attribution: '© OpenWeatherMap contributors'
            }).addTo(map);
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
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
}

export default RadarMap;