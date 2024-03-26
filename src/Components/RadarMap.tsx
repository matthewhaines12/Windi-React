import "../../src/Styles/Radar.css";
import "../../src/Styles/leaflet.css";
import L, { TileLayer } from "leaflet";
import { useLocation } from "./LocationContext";
import { useEffect } from "react";
import { MapContainer } from "react-leaflet";


//http://maps.openweathermap.org/maps/2.0/weather/TA2/0/0/0?appid=51792902640cee7f3338178dbd96604a

function RadarMap(){
    var map = L.map('map').setView([0, 0], 13);
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
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
      <MapContainer
        className="map"
        center={[38, 139.69222]}
        zoom={6}
        minZoom={3}
        maxZoom={19}
        maxBounds={[[-85.06, -180], [85.06, 180]]}
        scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
      {/* TODO: Add markers */}
      </MapContainer>
    </>
  );
}

export default RadarMap;

/*
    
 */