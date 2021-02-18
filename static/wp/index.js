import React, { useState } from "react";
import ReactDOM from "react-dom";
import HelloWorld from "./HelloWorld";
import { Login } from "./loginForm";
import ZipCodeSearch from "./zipCodeSearch";
import Playlist from "./playlist";

function App(props) {
    const [zipcode, setZipcode] = useState("");
    const [playlist, setPlaylist] = useState([]);

    const fetchWeather = (zipcode) => {
        setZipcode(zipcode);
      fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${encodeURIComponent(zipcode)},us&appid=`)
        .then((response) => {
            console.log("------------",response);
          return response.json();
        })
        .then((data) => {
            console.log("%%%%%%%%%%%%%%%%%%%", data)
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

    // const buildPlaylist = (pl)
        // letsetWeather(weather);

    //     .then((result) => {console.log(result); return result})
    // .then((result) => fetch(`/patients/${result.patientid}`))
    // .then((response) => response.json())
    // .then((result) => {console.log(result); return result})
    // .then((result) => setPatient(result))

    console.log("****",playlist)
    return (
        <section>
            <ZipCodeSearch fetchWeather={fetchWeather} />
            <Playlist playlist={playlist} />
        </section>
    );
    
}
// ReactDOM.render(<HelloWorld />, document.getElementById("react-root"));
// ReactDOM.render(<Login />, document.getElementById("login"));
ReactDOM.render(<App />, document.getElementById("app"));

export default App;