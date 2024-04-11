import { useState } from "react";
import {useLocation} from "./LocationContext";


const {locationData, setLocationData} = useLocation();
const [locationFailed, setLocationFailed] = useState(false);

function Location(){

    var options = {
        highAccuracyEnabled: true,
        timeout: 10000,
        maxAge: 0,
    };

    function Success(position: { coords: any }) {
   
        setLocationData({locations: [{ lat: position.coords.latitude, lng: position.coords.longitude }],});
    }

    function Errors(err: { code: any; message: any }) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        setLocationFailed(true);
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
      }
    });
  } else {
    console.log("Geolocation not supported");
    setLocationData({locations: [{ lat: 90, lng: 90 }],});
  }
}
export default {
    locationData,
    locationFailed,
}