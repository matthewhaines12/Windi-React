import { useEffect } from "react";
//import "./App.css";


function Location() {
  var options = {
    highAccuracyEnabled: true,
    timeout: 10000,
    maxAge: 0,
  };

  function Success(position: { coords: any; }){
    var coord = position.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${coord.latitude}`);
    console.log(`Longitude: ${coord.longitude}`);
    console.log(`More or less ${coord.accuracy} meters.`);
  }
  
  function Errors(err: { code: any; message: any; }){
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if(navigator.geolocation){
        navigator.permissions.query({name: "geolocation"}).then(function (result){
            console.log(result);
            if (result.state === "granted") {
              //If granted then you can directly call your function here
              navigator.geolocation.getCurrentPosition(Success, Errors, options);
            } else if (result.state === "prompt") {
              //If prompt then the user will be asked to give permission
              navigator.geolocation.getCurrentPosition(Success, Errors, options);
            } else if (result.state === "denied") {
              //If denied then you have to show instructions to enable location
            }
        });
    } else {
        console.log("Geolocation not supported");
    }
  }, []);

  return <div className="Location"></div>;
}

export default Location;