import { useActionData } from "react-router-dom";
import Location from "./Geolocation";
import axios from "axios";
import { useEffect } from "react";

function getCurrentWeather(){
    
    
    const fetchWeather = async () => {
        var latlong = Location();
        try{
            const CurrentWeather = await axios.get("https://api.openweathermap.org/data/2.5/weather?lat="+latlong[0]+"&lon="+latlong[1]+"&appid=c4dc6e461bacc597e2caa8bc0042f17e");
            console.log(CurrentWeather.data);
        }catch(err){
            console.error(err)
        }
    }

    useEffect(()=> {
        fetchWeather();
    }, [])

    return <div className="WeatherData"></div>
}