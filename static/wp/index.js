import React, { useState } from "react";
import ReactDOM from "react-dom";
import useStickyState from "./useStickyState";
// import { Login } from "./loginForm";
import ZipCodeSearch from "./zipCodeSearch";
import ShowPlaylist from "./playlist";
import PlaylistHeader from "./playlistHeader";
import Reroll from "./reroll";
import SpotifyLogin from "./spotifylogin";
//import Spotify from "./app.js";
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App(props) {
    /*
    const [zipcode, setZipcode] = useState("");
    const [playlist, setPlaylist] = useState([]);
    const [weather, setWeather] = useState("");
    const [city, setCity] = useState("");
    const [icon, setIcon] = useState("");
    const [token, setToken] = useState("");
    */
    const [zipcode, setZipcode] = useStickyState("", "zipcode");
    const [playlist, setPlaylist] = useStickyState([], "playlist");
    const [weather, setWeather] = useStickyState("", "weather");
    const [city, setCity] = useStickyState("", "city");
    const [icon, setIcon] = useStickyState("", "icon");
    const [token, setToken] = useStickyState("", "token");

    const fetchWeather = (zipcode) => {
        setZipcode(zipcode);
        // key = process.env.REACT_APP_WEATHER_API_KEY;
        //        fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${encodeURIComponent(zipcode)},us&appid=#######`)
        fetch(`/api?do=getWeather&zip=${encodeURIComponent(zipcode)}`)
        .then((response) => {
            console.log("------------",response);
          return response.json();
        })
        .then((data) => {
            setWeather(data.weather[0].main);
            setCity(data.name);
            setIcon(data.weather[0].icon);
            console.log("%%%%%%%%%%%%%%%%%%%", weather);
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
            <ZipCodeSearch fetchWeather={fetchWeather} zipcode={zipcode} />
            {zipcode ? <PlaylistHeader weather={weather} city={city} icon={icon}/>:null}
            {playlist ? <ShowPlaylist playlist={playlist} /> :null}
            {zipcode ? <Reroll fetchWeather={fetchWeather} zipcode={zipcode} /> :null}
            <SpotifyLogin />
        </section>
    );
}
// ReactDOM.render(<HelloWorld />, document.getElementById("react-root"));
// ReactDOM.render(<Login />, document.getElementById("login"));
ReactDOM.render(<App />, document.getElementById("app"));

export default App;
