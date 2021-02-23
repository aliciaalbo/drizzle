import React, { useState } from "react";
import ReactDOM from "react-dom";
import HelloWorld from "./HelloWorld";
import { Login } from "./loginForm";
import ZipCodeSearch from "./zipCodeSearch";
import Playlist from "./playlist";
import PlaylistHeader from "./playlistHeader";
import Reroll from "./reroll";
import Save from "./save";

function App(props) {
    const [zipcode, setZipcode] = useState("");
    const [playlist, setPlaylist] = useState([]);
    const [weather, setWeather] = useState("");
    const [city, setCity] = useState("");
    const [icon, setIcon] = useState("");

    const fetchWeather = (zipcode) => {
        setZipcode(zipcode);
        // key = process.env.REACT_APP_WEATHER_API_KEY;
      fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${encodeURIComponent(zipcode)},us&appid=3d00fac31853cdfa5a9913bcd89a25bd`)
        .then((response) => {
            console.log("------------",response);
          return response.json();
        })
        .then((data) => {
            setWeather(data.weather[0].main);
            setCity(data.name);
            setIcon(data.weather[0].icon);
            console.log("%%%%%%%%%%%%%%%%%%%", weather)
          // pass weather to python get playlist back
          fetch(`/api?do=zipcodeToPlaylist&weather=${data.weather[0].main}&city=${data.name}&icon=${data.weather[0].icon}`)
            .then((res) => res.json())
            .then((res) => {console.log(res); return res})
            .then((res) => setPlaylist(res))
            // .then((data) => {
            //   setPlaylist(data);
            //   console.log("***********", playlist)
            // })            
        })
        .catch((err) => {
          console.log("ERROR: ",err);
        });
    }

    return (
        <section>
            <ZipCodeSearch fetchWeather={fetchWeather} />
            <PlaylistHeader weather={weather} city={city} icon={icon}/>
            <Playlist playlist={playlist} />
            <Reroll fetchWeather={fetchWeather} zipcode={zipcode} />
            <Save />
        </section>
    );
    
}
// ReactDOM.render(<HelloWorld />, document.getElementById("react-root"));
// ReactDOM.render(<Login />, document.getElementById("login"));
ReactDOM.render(<App />, document.getElementById("app"));

export default App;