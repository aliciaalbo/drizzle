import React, { useState } from 'react';

function showPlaylist(props) {
  return(
    <ul>
      {props.playlist.map((song) => {
        return <li key={song.trackid}>{song.title}, a song by: {song.artist}</li>
      })}
    </ul>

  )
}

export default showPlaylist

{/* 
function getPlaylist(buildPlaylist) {
  function ZipCodeSearch({ fetchWeather }) {
    const [zipcode, setZipcode] = useState();
   
     //  function handleSubmit(e) {
     const handleSubmit = (e) => {
       e.preventDefault();
       console.log(e.target.zipcode.value);
       fetchWeather(e.target.zipcode.value);
    //   setZipcode(e.target.zipcode.value);
     };
    return ;
  }
  

   */}