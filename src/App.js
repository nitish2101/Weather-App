import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=8618334e75d429927e21a54e8090a92e`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  // const temp = Math.floor((data.main.temp - 32) * (5 / 9));
  // const feelsLike = Math.floor((data.main.feels_like - 32) * (5 / 9));

  return (
    <div className='app'>
      <div className='search'>
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type='text'
        />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp}°C</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? (
              <p className='des'>{data.weather[0].main}</p>
            ) : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className='bottom'>
            <div className='feels'>
              {data.main ? <p className='bold'>{data.main.temp}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className='humidity'>
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className='wind'>
              {data.wind ? (
                <p className='bold'>{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
