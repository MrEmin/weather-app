import { useState } from "react";
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setError(null);
        })
        .catch((error) => {
          setError("An error occurred. Please check your input and try again.");
        });
      setLocation("");
    }
  };

  console.log(data);
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        {error ? (
          <div className="error">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                {data.main ? <h1>{data.main.temp.toFixed(1)}°C</h1> : null}
              </div>
              <div className="description">
                <p>{data.weather?.[0].main}</p>
              </div>
            </div>

            {data.name !== undefined && (
              <div className="bottom">
                <div className="feels">
                  <p className="bold">{data.main?.feels_like.toFixed(1)}°C</p>
                  <p>Feels Like</p>
                </div>
                <div className="humidity">
                  <p className="bold">{data.main?.humidity}%</p>
                  <p>Humidity</p>
                </div>
                <div className="wind">
                  {/* {data.wind ? <p className="bold">{data.wind.speed.toFixed()} KMH</p> : null} */}
                  <p className="bold">{data.wind?.speed.toFixed()} KMH</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
