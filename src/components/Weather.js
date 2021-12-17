import React, { useEffect, useState } from "react";

let key = "7e48e18cef3474f6477a4854bc7b1901"
const url = 'https://api.openweathermap.org/data/2.5/'
const geo_url = 'http://api.openweathermap.org/geo/1.0/'
const icon = 'http://openweathermap.org/img/wn/'
const example = ' city name, 2-letter state code, 2-letter country code'

const Weather = () => {
    const [weather, setWeather] = useState({weather: 'undefined'});
    const [daily, setDaily] = useState([])
    const [location, setLocation] = useState({lat: '33.8025', lon: '-117.9931'})
    const [search, setSearch] = useState({name: 'Stanton', state: 'CA', country: 'US'})
    const [isCheck, setIsCheck] = useState(true)


    const handdlesubmit = (e) => {
        if(e.key === 'Enter') {        
            fetch(`${url}weather?q=${e.target.value}&units=imperial&appid=${key}`)
            .then(resp => resp.json())
            .then(result => {
                if(result.cod === '404') {
                    console.warn(`ERROR(${result.cod}): ${result.message}`)
                } else {
                    setLocation({lat: result.coord.lat, lon: result.coord.lon})
                }
            })

            e.target.value = ""
        }
    }

    const handdleClick = () => {
        setIsCheck(!isCheck)
        if(isCheck) {
            if(navigator.geolocation) {
                var options = { enableHighAccuracy: true, timeout:60000};
                navigator.geolocation.getCurrentPosition(function success(pos) {
                    setLocation({lat: pos.coords.latitude, lon: pos.coords.longitude})
                    console.log(pos.coords.latitude, pos.coords.longitude)
                }, function error(err) {
                    console.warn(`ERROR(${err.code}): ${err.message}`)
                }, options)
            }
        }
    }

    useEffect(() => {
  
        fetch(`${geo_url}reverse?lat=${location.lat}&lon=${location.lon}&limit=1&appid=${key}`)
        .then(resp => resp.json())
        .then(result => {
            if(result.cod === '404') {
                console.warn(`ERROR(${result.cod}): ${result.message}`)
            } else {
                setSearch({name: result[0].name, state: result[0].state, country: result[0].country})
            }
        })
        fetch(`${url}onecall?lat=${location.lat}&lon=${location.lon}&units=imperial&cnt=7&appid=${key}`)
            .then(resp => resp.json())
            .then(result => {
                setWeather(result.current)
                setDaily(result.daily)
            })
    },[location.lat, location.lon])
    return (
        <div>
            {(typeof daily !== 'undefined' && weather.weather !== 'undefined' ) ? (
            <div className="container">
                <div className="weather-header">
                    <input type="text" className="search" placeholder={example} onKeyPress={handdlesubmit} />
                    <p>Detect my location</p>
                    <label className="switch-button">
                        <input type="checkbox" onClick={handdleClick}/>
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="current-weather">
                    <p className="location">{search.name}, {search.state}, {search.country}</p>
                    <div className="content">
                        <img src={`${icon}${weather.weather[0].icon}.png`} alt=""/>
                        <p>{Math.round(weather.temp)}° </p>
                        <p>{weather.weather[0].main}</p>
                        
                    </div>
                    <div className="detail">
                        <p>Humidity: {weather.humidity}</p>
                        <p>Feel like: {weather.feels_like}°</p>
                        <p>Visibility: {weather.visibility} m</p>
                    </div>
                    <div className="detail">
                        <p>Uvi: {weather.uvi}</p>
                        <p>Dew point: {weather.dew_point}° </p>
                        <p>Wind speed: {weather.wind_speed} km/h </p>
                    </div>
                </div>
                <p>Daily forecast</p> 
                <div className="forecast-card">
                    {daily.map((data, index) => {
                        var date = new Date()
                        date.setDate(date.getDate() + index)
                        return (<div className="card" key={index}>
                            <img src={`${icon}${data.weather[0].icon}.png`} alt=""/>
                            <p>{Math.round(data.temp.max)}° / {Math.round(data.temp.min)}°</p>
                            <p>{data.weather[0].description}</p>
                            <p>{date.toLocaleDateString('en-us',{weekday: 'short', day:'numeric', month:'long'})}</p>
                        </div>    
                    )})}
                </div>
            </div>
            ) : (<div>Loading...</div>)}
        </div>
    );
}

export default Weather