import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useCookies } from "react-cookie";
import useStickyState from "./useStickyState";
// import { Login } from "./loginForm";
import ZipCodeSearch from "./zipCodeSearch";
import ShowPlaylist from "./playlist";
import PlaylistHeader from "./playlistHeader";
import Reroll from "./reroll";
import SavePlaylist from "./savePlaylist";
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
    const [access_token, setAccessToken] = useStickyState("", "access_token");
    const [refresh_token, setRefreshToken] = useStickyState("", "refresh_token");
    const [name, setName] = useStickyState("", "name");
    const [email, setEmail] = useStickyState("", "email");

    const [cookies, setCookie, removeCookie] = useCookies(['access_cookie']);
    // happens on first load after API callback
    if (cookies.access_cookie && access_token != cookies.access_cookie) {
      console.log('update access token', cookies.access_cookie);
      setAccessToken(cookies.access_cookie);
    }

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
            .catch((err) => {
              console.log("ERROR: ",err);
            });
          // .then((data) => {
          //   setPlaylist(data);
          //   console.log("***********", playlist)
          // })            
      })
      .catch((err) => {
        console.log("ERROR: ",err);
      });
    };

    /*
    const Login = () => {
      fetch(`/api?do=login&playlist=${playlist}`)
    };
    */
    /*
    const savePlaylist = (props) => {
      const tracks = props.playlist.map(t => t.trackid);
      fetch(`/api?do=savePlaylist&access_token=${props.access_token}&playlist=${tracks}`)
      .then((res) => res.json())
      .then((res)=> {console.log(res); return res})
      .catch((err) => {
        console.log("ERROR: ",err);
      });
    };
    */

    //             <SavePlaylist playlist={playlist} access_token={access_token} />
    //             <SavePlaylist savePlaylist={savePlaylist} playlist={playlist} access_token={access_token} />
    return (
        <section>
            <ZipCodeSearch fetchWeather={fetchWeather} zipcode={zipcode} />
            {zipcode ? <PlaylistHeader weather={weather} city={city} icon={icon}/>:null}
            {playlist ? <ShowPlaylist playlist={playlist} /> :null}
            {zipcode ? <Reroll fetchWeather={fetchWeather} zipcode={zipcode} /> :null}
            <SpotifyLogin />
            <SavePlaylist playlist={playlist} access_token={access_token} />
        </section>
    );
}
// ReactDOM.render(<HelloWorld />, document.getElementById("react-root"));
// ReactDOM.render(<Login />, document.getElementById("login"));
ReactDOM.render(<App />, document.getElementById("app"));

export default App;
