/*import { useEffect } from "react";

function getCurrentLocation() {
  var latlong: Array<number> = [0.0, 0.0];

  var options = {
    highAccuracyEnabled: true,
    timeout: 10000,
    maxAge: 0,
  };

function Success(position: { coords: any }) {
    console.log(`LOCATION RECEIVED`);
    latlong[0] = position.coords.latitude;
    latlong[1] = position.coords.longitude;
  }

  function Errors(err: { code: any; message: any }) {
    console.warn(`ERROR(${err.code}): ${err.message}`); //Basic error function, not much to explain
  }

  //useEffect(() => {
    //I'm still learning how this works, has to do with components and updating the webpage without repeatedly calling the same function. UseState works similar. https://youtu.be/O6P86uwfdR0  https://youtu.be/gv9ugDJ1ynU
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
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
  //}, []);
  console.log(`LOCATION DATA: ${latlong}`);
  return latlong;
}

export default getCurrentLocation;
*/
