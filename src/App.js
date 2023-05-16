import { useState, useEffect } from "react";
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  const fetchData = (url) => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setError(null);
      })
      .catch((error) => {
        setError("An error occurred. Please check your input and try again.");
      });
  };

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      fetchData(url);
      setLocation("");
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
          fetchData(locationUrl);
        },
        (error) =>
          setError(
            "Unable to retrieve your location. Please enter a city name manually."
          )
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

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
