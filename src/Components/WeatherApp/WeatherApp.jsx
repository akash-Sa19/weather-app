import React, { useEffect, useState } from "react";
import "./WeatherApp.css";

// import {
//   search_icon,
//   humidity_icon,
//   wind_icon,
// } from "../Assets";


import search_icon from '../Assets/search.png'
import humidity_icon from '../Assets/humidity.png'
import wind_icon from '../Assets/wind.png'

const WeatherApp = () => {
    let api_key = 'e659d1a3e70cd93ac7787c49c9306244'
    const [wicon, setWicon] = useState();
    const [wiconDescription, setWiconDescription] = useState();

    useEffect(() => {
      search();
    }, [])

    const search = async () => {
      let element = document.getElementsByClassName('cityInput')
        if (element[0].value === ''){
          element[0].value = 'raipur'
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}&units=Metric`

        let response = await fetch(url);
        let data = await response.json();
        console.log(data);

        const humidity = document.getElementsByClassName('humidity-percentage')
        const wind = document.getElementsByClassName('wind-rate')
        const temperature  = document.getElementsByClassName('weather-temp')
        const location = document.getElementsByClassName('weather-location')

        humidity[0].innerHTML = data.main.humidity + '%';
        wind[0].innerHTML = Math.floor(data.wind.speed) + 'km/h';
        temperature[0].innerHTML = Math.floor(data.main.temp) + '°c';
        location[0].innerHTML = data.name; 
        setWicon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        setWiconDescription(data.weather[0].description);


        // if(data.weather[0].icon === '01d' || data.weather[0].icon === '01n'){
        //     setWicon(clear_icon)
        // } else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
        //     setWicon(cloud_icon)
        // } else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
        //     setWicon(drizzle_icon)
        // } else if (data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
        //     setWicon(drizzle_icon)
        // } else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
        //     wicon(rain_icon)
        // } else if (data.weather[0].icon === '10d' || data.weather[0].icon === '10n') {
        //     wicon(rain_icon)
        // } else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
        //     wicon(snow_icon)        
        // } else {
        //     wicon(clear_icon)
        // }
        element[0].value = ''
    }
  return (
    <div className="container">

      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div className="search-icon" onClick={() => {search()}}>
          <img src={search_icon} alt="Search Icon" />
        </div>
      </div>

      <div className="weather-image" >
        <img src={wicon} alt={wiconDescription}  />
      </div>

      <div className="weather-temp">24°c</div>

      <div className="weather-location">London</div>

      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="humidity" className="icon" />
          <div className="data">
            <div className="humidity-percentage">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="wind speed" className="icon" />
          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">WindSpeed</div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default WeatherApp;
