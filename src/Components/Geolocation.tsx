import { useEffect } from "react";
//import "./App.css";

function Location() {

  var latlong: Array<number> = [0.0, 0.0]

  var options = {
    highAccuracyEnabled: true,
    timeout: 10000,
    maxAge: 0,
  };

  function Success(position: { coords: any; }){
    var coord = position.coords;
    //console.log("Your current position is:");
    //console.log(`Latitude : ${coord.latitude}`);
    //console.log(`Longitude: ${coord.longitude}`);
    //console.log(`More or less ${coord.accuracy} meters.`);

    latlong[0] = coord.latitude;
    latlong[1] = coord.longitude;

    console.log(`Latitude : ${latlong[0]}`);
    console.log(`Longitude : ${latlong[1]}`);
  }
  
  function Errors(err: { code: any; message: any; }){
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if(navigator.geolocation){
        navigator.permissions.query({name: "geolocation"}).then(function (result){
            console.log(result);
            if (result.state === "granted") {

              navigator.geolocation.getCurrentPosition(Success, Errors, options);

            } else if (result.state === "prompt") {

              navigator.geolocation.getCurrentPosition(Success, Errors, options);

            } else if (result.state === "denied") {
              //If denied then you have to show instructions to enable location
            }
        });
    } else {
        console.log("Geolocation not supported");
    }

  }, []);

  setTimeout(()=> {
    console.log(`Latitude1 : ${latlong[0]}`);
    console.log(`Longitude1 : ${latlong[1]}`);
  }, 200);

  return latlong;
}

export default Location;