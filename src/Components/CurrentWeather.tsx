import { useActionData } from "react-router-dom";
import Location from "./Geolocation";
import axios from "axios";
import { useEffect } from "react";

function getCurrentWeather(){
    
    
    const fetchWeather = async () => {
        try{
            const weather = await axios.get("https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}");
            console.log(weather.data);
        }catch(err){
            console.error(err)
        }
    }

    useEffect(()=> {
        fetchWeather();
    }, [])

    return <div className="WeatherData"></div>
}