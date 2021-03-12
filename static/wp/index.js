import React, {useState} from "react";
import ReactDOM from "react-dom";
import useStickyState from "./useStickyState";
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
import SearchToggle from "./searchToggle";
import SpotPlayer from "./spotplayer";
import BadZip from "./flashBadZip";
import BadCoords from "./flashBadCoords";
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// import Background from './static/img/background.png';

// var sectionStyle = {
//   backgroundImage: `url(${Background})`
// }


function App() {
    const [zipcode, setZipcode] = useStickyState("", "zipcode");
    const [playlist, setPlaylist] = useStickyState([], "playlist");
    const [weather, setWeather] = useStickyState("", "weather");
    const [city, setCity] = useStickyState("", "city");
    const [icon, setIcon] = useStickyState("", "icon");
    const [isReady, setIsReady] = useState("");
    const [deviceId, setDeviceId] = useState("");
    const [access_token, setAccessToken] = useStickyState("", "access_token");
    // const [refresh_token, setRefreshToken] = useStickyState("", "refresh_token");
    const [name, setName] = useStickyState("", "name");
    const [email, setEmail] = useStickyState("", "email");
    const [lon, setLon] = useStickyState("", "lon");
    const [lat, setLat] = useStickyState("", "lat");
    const [toggle, setToggle] = useStickyState("US", "toggle");
    const [playstate, setPlaystate] = useStickyState("", "playstate");
    const [playbackToggle, setPlaybackToggle] = useStickyState('no', "playbackToggle");
    const [isInvalidZipInput, setInvalidZipInput] = useState("");
    const [isInvalidCoordInput, setInvalidCoordInput] = useState("");

    // instantiate the Spotify Player passes props in object to webplayer.js
    let webplayer = WebPlayer({ access_token: access_token, isReady: isReady, setIsReady: setIsReady, setDeviceId: setDeviceId });

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

    const fetchWeather = (zipcode) => {
      setZipcode(zipcode);
      setInvalidZipInput('');
      fetch(`/api?do=getWeather&zip=${encodeURIComponent(zipcode)}`)
      .then((response) => {
          console.log("------------",response);
        return response.json();
      })
      .then((data) => {
        console.log(data.cod);
        if (data.cod != '404'){
          setWeather(data.weather[0].main);
          setCity(data.name);
          setIcon(data.weather[0].icon);

          console.log("%%%%%%%%%%%%%%%%%%%", weather);
          // pass weather to python get playlist back
          fetch(`/api?do=zipcodeToPlaylist&weather=${data.weather[0].main}&city=${data.name}&icon=${data.weather[0].icon}`)
            .then((res) => res.json())
            .then((res) => {console.log(res); return res})
            .then((res) => {
              setPlaybackToggle('no');
              // for playing in the web player
              setPlaystate({
                uris: res.map(t => 'spotify:track:' + t.trackid),
                offset: 0
              });
              // for saving to user account
              setPlaylist(res);
            })
            .catch((err) => {
              console.log("ERROR: ",err);
            });
          } else{
            setInvalidZipInput('yes');
          }
      })
      
      .catch((err) => {
        console.log("ERROR: ",err);
      });
    };

    const fetchWeatherLatLon = (lat,lon) => {
      setLat(lat);
      setLon(lon);
      setInvalidCoordInput('');
      fetch(`/api?do=getWeatherLatLon&lat=${lat}&lon=${lon}`)
      .then((response) => {
          console.log("------------",response);
        return response.json();
      })
      .then((data) => {
        console.log(data.cod);
        if (data.cod != '400'){
          setWeather(data.weather[0].main);
          setCity(data.name);
          setIcon(data.weather[0].icon);
        
          console.log("%%%%%%%%%%%%%%%%%%%", weather);
          // pass weather to python get playlist back
          fetch(`/api?do=zipcodeToPlaylist&weather=${data.weather[0].main}&city=${data.name}&icon=${data.weather[0].icon}`)
            .then((res) => res.json())
            .then((res) => {console.log(res); return res})
            .then((res) => {
              // for playing in the web player
              setPlaystate({
                uris: res.map(t => 'spotify:track:' + t.trackid),
                offset: 0
              });
              // for saving to user account
              setPlaylist(res);
              setPlaybackToggle('no')
            })
            .catch((err) => {
              console.log("ERROR: ",err);
            });
          }
          else{
            setInvalidCoordInput('yes');
          }
        
    })
    .catch((err) => {
      console.log("ERROR: ",err);
    });
  };


    const searchToggle = () => {
      if (toggle === 'US') {
        setToggle('')
      }
      else {
        setToggle('US')
        console.log(toggle)}
    };

    const logoutUser = (email) => {
      if (email) {
        fetch(`/api?do=logout&email=${encodeURIComponent(email)}`)
        .then(() => {
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

    return (
        <section className="page">
            <div className="child">
            <EB>{toggle === 'US' ? <ZipCodeSearch fetchWeather={fetchWeather} zipcode={zipcode} />
             : <LatLonSearch fetchWeatherLatLon={fetchWeatherLatLon} lat={lat} lon={lon} />}</EB>
            </div>
            <div className="child">
            <EB><SearchToggle searchToggle={searchToggle} toggle={toggle}/></EB>
            </div>
            <div className="child">
            <EB>{isInvalidZipInput ==='' ? null : <BadZip />}</EB>
            </div>
            <div className="child">
            <EB>{isInvalidCoordInput ==='' ? null : <BadCoords />}</EB>
            </div>
            <div className="child">
            <EB>{zipcode || lat ? <PlaylistHeader weather={weather} city={city} icon={icon} username={name} />:null}</EB>
            </div>
            <div className="child">
            <EB>{playlist.length ? <ShowPlaylist playlist={playlist} name={name} /> :null}</EB>
            </div>
            {access_token && deviceId && playlist.length ? 
            <EB><div className="btn-group col text-center">
              <SpotPlayer playbackToggle={playbackToggle} setPlaybackToggle={setPlaybackToggle} access_token={access_token} webplayer={webplayer} playstate={playstate} playlist={playlist} />
            </div></EB>
           : null}

            <br />

            <div className="child container"><div className="row">
              <div className="btn-group col text-left">
              <EB>{zipcode ? <Reroll  fetchWeather={fetchWeather} zipcode={zipcode} /> :null}</EB>
              </div>
              {/* {access_token && deviceId && playlist.length ? 
              <EB><div className="btn-group col text-center">
                <SpotPlayer playbackToggle={playbackToggle} setPlaybackToggle={setPlaybackToggle} access_token={access_token} webplayer={webplayer} playstate={playstate} playlist={playlist} />
              </div></EB>
              : null} */}
              {access_token && playlist.length ?
              <EB><div className="btn-group col text-center">
                <SavePlaylist  playlist={playlist} access_token={access_token} username={name} weather={weather} city={city} />
              </div></EB>
              : null}
              <div className="btn-group col text-right">
              <EB>{email ? <Logout  logoutUser={logoutUser} email={email} /> : <SpotifyLogin />}</EB>
              </div>
            </div></div>
            {/* <div style={{ marginLeft: "auto" }} className="btn-group mr-3"> */}
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
