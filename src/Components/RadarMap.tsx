import { useEffect } from "react";
import { useLocation } from "./LocationContext";


function RadarMap(){
    var firstRun = true;
    const { locationData } = useLocation(); // This uses the context we've set up
    const { setLocationData } = useLocation();
    useEffect(() => {
        if (locationData.locations.length > 0) {
          const { lat, lon } = locationData.locations[0];
          // Use the lat and lon to fetch weather data
          fetch(
            `${api.base}forecast/daily?lat=${lat}&lon=${lon}&APPID=${api.key}&units=imperial`
          )
            .then((res) => res.json())
            .then((data) => {
              setWeatherData(data); // Update state with fetched weather data
              console.log(data); // Logging for debugging purposes
            })
            .catch((error) => console.error("Failed to fetch weather data", error));
        } else if (firstRun) {
    
          var options = {
            highAccuracyEnabled: true,
            timeout: 10000,
            maxAge: 0,
          };
    
          function Success(position: { coords: any }) {
    
            setLocationData({locations: [{ lat: position.coords.latitude, lon: position.coords.longitude }],});
            fetch(
              `${api.base}forecast/daily?lat=${locationData.locations[0]}&lon=${locationData.locations[1]}&APPID=${api.key}&units=imperial`
            )
              .then((res) => res.json())
              .then((data) => {
                setWeatherData(data); // Update state with fetched weather data
                console.log(data); // Logging for debugging purposes
              })
              .catch((error) =>
                console.error("Failed to fetch weather data", error)
              );
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
}

export default RadarMap;