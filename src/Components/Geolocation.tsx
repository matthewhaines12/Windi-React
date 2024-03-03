import { useEffect } from "react";
//import "./App.css";

/*
The Location() fuction starts by requesting permission to access location. If the user allows location access, the Geolocation API is used
to get their coordinates. When the function getCurrentPosition() is called, it runs the Success() function. Array 'latlong' is used to store 
the coords, [latitude, longitude]. Then, the Success() function outputs the lat and long to console (view in browser with F12). When exiting
the if-statement and the useEffect(), There is another delayed debug to print the lat and long to console. The delay is needed! <-- https://youtu.be/ZcQyJ-gxke0
When the Location() function ends it returns the latlong array.
*/
function Location() {

  var latlong: Array<number> = [0.0, 0.0]

  var options = {
    highAccuracyEnabled: true,
    timeout: 10000,
    maxAge: 0,
  };

  /*
  'position' is an object given by the getCurrentPosition() function. The getCurrentPosition() 
  function doesn't return anything, though, we just have access to it since Success() was passed to
  the getCurrentPosition() function. 'coords' is another object within the 'position' object 
  that has latitude, longitude, accuracy, and probably more but I didn't bother checking.
  */
  function Success(position: { coords: any; }){
    //var coord = position.coords;

    //console.log("Your current position is:");
    //console.log(`Latitude : ${coord.latitude}`);
    //console.log(`Longitude: ${coord.longitude}`);
    //console.log(`More or less ${coord.accuracy} meters.`);

    //These will need removed before the end of the semester ^^^

    latlong[0] = position.coords.latitude; 
    latlong[1] = position.coords.longitude;

    //When outputting with a variable in the string, use ` tilde (the top left key, usually) and surround the variable with ${}. {} is JS stuff and $ sorta ignores the quotes
    console.log(`Latitude : ${latlong[0]}`); 
    console.log(`Longitude : ${latlong[1]}`);
  }
  
  function Errors(err: { code: any; message: any; }){
    console.warn(`ERROR(${err.code}): ${err.message}`); //Basic error function, not much to explain
  }

  useEffect(() => { //I'm still learning how this works, has to do with components and updating the webpage without repeatedly calling the same function. UseState works similar. https://youtu.be/O6P86uwfdR0  https://youtu.be/gv9ugDJ1ynU
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

  /*
  The delay is required since this is all multi-threaded. There's a delay while the API info is retrieved from the internet, but since this is multi-threaded
  the program can keep running before a response is given. There's always a delay, you know ping. It's why I was getting the console outputs in the wrong order, 
  since the getCurrentPosition() function of the Geolocation API was still getting the lat and long while the rest of the program kept running. It didn't run the 
  Success() function by the time the other thread ran the last two console outputs. Then when the Success() function ran, it spit out the outputs from that function.

  This is kinda hard to explain, just watch the video I put in the description at the top: https://youtu.be/ZcQyJ-gxke0
  */

  setTimeout(()=> {
    console.log(`Latitude1 : ${latlong[0]}`);
    console.log(`Longitude1 : ${latlong[1]}`);
  }, 200);

  return latlong;
}

export default Location;