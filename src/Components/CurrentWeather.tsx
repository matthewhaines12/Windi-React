import { useActionData } from "react-router-dom";
import Location from "./Geolocation";
import axios from "axios";
import { useEffect } from "react";

/*
Most of this was 'inspired' by an Indian guy on YouTube (https://youtu.be/70x6yp2CJTU). But the 'CurrentWeather' object is where you'll interact.
It returns a JSON so you'll use these https://openweathermap.org/current commands to get the data you need to display. 
The fetchWeather const? is an async function, so when it's used the code keeps going until there's a response. But
inside the thread for the asynchronous function, it calls the API and 'awaits' for a response to continue to the next
lines.

Whether you use this file to put the current weather component for the homepage is up to you. Might want to do that if you can't get this to return
the 'CurrentWeather' object easily. But that depends on how you want to separate the code. Keep components and their API calls together? Or separate the
files so each component is separate from it's API data.
*/
function CurrentWeather(){
    
    const fetchWeather = async () => {
        var latlong = Location(); //This is where the output from Geolocation API is. Obviously, something will need changed when we have an address search. Probably an if-statemet or useEffect?
        try{
            const CurrentWeather = await axios.get("https://api.openweathermap.org/data/2.5/weather?lat="+latlong[0]+"&lon="+latlong[1]+"&appid=c4dc6e461bacc597e2caa8bc0042f17e");
            console.log(CurrentWeather.data); 
        }catch(err){
            console.error(err)
        }
    }

    //useEffect(()=> {
        fetchWeather();
    //}, [])

    return <div className="WeatherData"></div> //Might want to change this to return 'CurrentWeather'... hopefully that works? I'm tied now and my eyes are crunchy.
}

export default CurrentWeather;