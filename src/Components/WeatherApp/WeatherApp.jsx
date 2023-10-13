import React, { useState } from "react";
import './WeatherApp.css';
import search_icon from '../Assests/search.png';
import clear_icon from '../Assests/clear.png';
import rain_icon from '../Assests/rain.png';
import wind_icon from '../Assests/wind.png';
import cloud_icon from '../Assests/cloud.png';
import drizzle_icon from '../Assests/drizzle.png';
import snow_icon from '../Assests/snow.png';
import humidity_icon from '../Assests/humidity.png';
const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState({
        humidity: "",
        wind: "",
        temperature: "",
        location: "",
    });
    const API_KEY = "69730ff33333d1fa7aba5e5fdfaf8809";

    const [wicon, setWicon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityinput")[0];
        let cityName=element.value;
        if (!cityName) {
            return ;
        }

        try{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`

        let response = await fetch(url);
        let data = await response.json();
        console.log(data);

        if(data.main && data.main.humidity && data.wind && data.wind.speed && data.name && data.main.temp){
            setWeatherData({
                humidity: data.main.humidity,
                wind: Math.floor(data.wind.speed),
                temperature: Math.floor(data.main.temp),
                location: data.name,
            });
        }

        if(data.weather[0].icon == "01d" || data.weather[0].icon == "01n"){
            setWicon(clear_icon);
        }
        else if(data.weather[0].icon == "02d" || data.weather[0].icon == "02n"){
            setWicon(cloud_icon);
        }
        else if(data.weather[0].icon == "03d" || data.weather[0].icon == "03n"){
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon == "04d" || data.weather[0].icon == "04n"){
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon == "09d" || data.weather[0].icon == "09n"){
            setWicon(rain_icon)
        }
        else if(data.weather[0].icon == "10d" || data.weather[0].icon == "10n"){
            setWicon(rain_icon)
        }
        else if(data.weather[0].icon == "13d" || data.weather[0].icon == "13n"){
            setWicon(snow_icon);
        }
        else{
            setWicon(clear_icon);
        }
       }
        catch(error){
            console.log("error detecting weather data",error);
        }


        // const humidity = document.getElementsByClassName("humidity-percent");
        // const wind = document.getElementsByClassName("wind-rate");
        // const temperature = document.getElementsByClassName("weather-temp");
        // const location = document.getElementsByClassName("weather-location")

        // humidity[0].innerHTML = data?.main?.humidity+"%";
        // wind[0].innerHTML = data?.wind?.speed+"km/h";
        // temperature[0].innerHTML = data?.main?.temp+"oc";
        // location[0].innerHTML = data?.name;
    }
    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityinput" placeholder="Enter city name"></input>
                <div className="search-icon" onClick={() => { search() }}>
                    <img src={search_icon} alt="serach" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">{weatherData.temperature}°C</div>
            <div className="weather-location">{weatherData.location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data-ch">
                        <div className="humidity-percent">{weatherData.humidity}%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">{weatherData.wind}km/hr</div>
                        <div className="text">Wind speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WeatherApp;