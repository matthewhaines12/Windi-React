import { useEffect, useState } from "react";
import axios from "axios";

function getWeather(GlobalWeather: Array<{}>) {
  var currWeather: Array<number | string> = [];
  var latlong: Array<number> = [0.0, 0.0];

  var options = {
    highAccuracyEnabled: true,
    timeout: 10000,
    maxAge: 0,
  };

  function Success(position: { coords: any }) {
    latlong[0] = position.coords.latitude;
    latlong[1] = position.coords.longitude;

    const fetchWeather = async () => {
      try {
        const CurrentWeather = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latlong[0]}&lon=${latlong[1]}&appid=c4dc6e461bacc597e2caa8bc0042f17e`
        );
        console.log(CurrentWeather.data);
        currWeather[0] = CurrentWeather.data.name;
        currWeather[1] = CurrentWeather.data.main.temp;
        currWeather[2] = CurrentWeather.data.clouds.all;
        GlobalWeather = CurrentWeather.data;
      } catch (err) {
        console.error(err);
      }
    };
    useEffect(()=>{
      fetchWeather();
    })
  }

  function Errors(err: { code: any; message: any }) {
    console.warn(`ERROR(${err.code}): ${err.message}`); //Basic error function, not much to explain
  }

  useEffect(() => {
    //I'm still learning how this works, has to do with components and updating the webpage without repeatedly calling the same function. UseState works similar. https://youtu.be/O6P86uwfdR0  https://youtu.be/gv9ugDJ1ynU
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
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

  return GlobalWeather;
}

export default getWeather;

function AutoWeather(){
  const [userLocation, setUserLocation] = useState(null);
  
}