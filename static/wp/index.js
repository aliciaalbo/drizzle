import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
//import { useCookies } from "react-cookie";
import useStickyState from "./useStickyState";
// import { Login } from "./loginForm";
import ZipCodeSearch from "./zipCodeSearch";
import ShowPlaylist from "./playlist";
import PlaylistHeader from "./playlistHeader";
import Reroll from "./reroll";
import SavePlaylist from "./savePlaylist";
import SpotifyLogin from "./spotifylogin";
import Logout from "./logout";
import LatLonSearch from "./latLon";
import WebPlayer from "./webplayer";
import EB from "./errorBoundary";
//import SpotifyPlayer from 'react-spotify-web-playback';
//import Spotify from "./app.js";
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    const [zipcode, setZipcode] = useStickyState("", "zipcode");
    const [playlist, setPlaylist] = useStickyState([], "playlist");
    const [weather, setWeather] = useStickyState("", "weather");
    const [city, setCity] = useStickyState("", "city");
    const [icon, setIcon] = useStickyState("", "icon");
    const [isReady, setIsReady] = useState("");
    const [deviceId, setDeviceId] = useState("");  
    const [access_token, setAccessToken] = useStickyState("", "access_token");
//    useEffect(() => {
//      if (access_token) {
        let spotplayer = WebPlayer({ access_token: access_token, isReady: isReady, setIsReady: setIsReady, setDeviceId: setDeviceId });
        console.log('ppp',spotplayer);
//      }
//    }, [access_token, isReady]);

    // const [refresh_token, setRefreshToken] = useStickyState("", "refresh_token");
    const [name, setName] = useStickyState("", "name");
    const [email, setEmail] = useStickyState("", "email");
    const [lon, setLon] = useStickyState("", "lon");
    const [lat, setLat] = useStickyState("", "lat");

    // load the access token through Python's session if can
    if (!access_token) {
      console.log('access token check');
      fetch(`/api?do=getInfo`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data)
          setAccessToken(data.access_token);
          setName(data.name);
          setEmail(data.email);
        
          console.log('access token set!');
        }
      })
      .catch((err) => {
        console.log("ERROR: ",err);
      });
    }
    /*
    const [cookies, setCookie, removeCookie] = useCookies(['access_cookie']);
    // happens on first load after API callback
    if (cookies.access_cookie && access_token != cookies.access_cookie) {
      console.log('update access token', cookies.access_cookie);
      setAccessToken(cookies.access_cookie);
    }
    */
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

    const fetchWeatherLatLon = (lat,lon) => {
      setLat(lat);
      setLon(lon);
      fetch(`/api?do=getWeatherLatLon&lat=${lat}&lon=${lon}`)
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
      })
      .catch((err) => {
        console.log("ERROR: ",err);
      });
    };

    const logoutUser = (email) => {
      if (email) {
        fetch(`/api?do=logout&email=${encodeURIComponent(email)}`)
        .then((res) => {
          console.log('logout attempt')
          setAccessToken("");
          setName("");
          setEmail("");
        })
        .catch((err) => {
            console.log("ERROR: ",err);
        });
      }
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

    return (
        <section>
            <EB><ZipCodeSearch fetchWeather={fetchWeather} zipcode={zipcode} /></EB>
            <EB><LatLonSearch fetchWeatherLatLon={fetchWeatherLatLon} lat={lat} lon={lon} /></EB>
            <EB>{zipcode ? <PlaylistHeader weather={weather} city={city} icon={icon} username={name} />:null}</EB>
            <EB>{playlist.length ? <ShowPlaylist playlist={playlist} name={name} /> :null}</EB>
            <EB>{zipcode ? <Reroll fetchWeather={fetchWeather} zipcode={zipcode} /> :null}</EB>
            <EB>{access_token ? null : <SpotifyLogin />}</EB>
            <EB>{playlist.length ? <SavePlaylist playlist={playlist} access_token={access_token} username={name} weather={weather} city={city} />: null}</EB>
            <EB>{email ? <Logout logoutUser={logoutUser} email={email} /> : null}</EB>
            {/* {access_token ? console.log(<WebPlayer access_token={access_token} />) : null} */}
            {/* <WebPlayer player={player} /> */}
            {/* { access_token ? <SpotifyPlayer token={access_token} uris="['spotify:track:6rqhFgbbKwnb9MLmUQDhG6']"/> : null} */}
        </section>
    );
}
// ReactDOM.render(<HelloWorld />, document.getElementById("react-root"));
// ReactDOM.render(<Login />, document.getElementById("login"));
ReactDOM.render(<App />, document.getElementById("app"));

export default App;
