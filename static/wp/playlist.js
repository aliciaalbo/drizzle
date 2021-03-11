import React, { useState } from 'react';

function ShowPlaylist(props) {
  return (
    <div className="playlist">
      {props.playlist.map((song) => {
        return (
        <div>
      <div className="row playlist-title">{song.title}</div>
      <div className="row playlist-artist"> {song.artist}</div>
        </div>
        )})}
    </div>
      )}



export default ShowPlaylist;

{/* // return(
//   <div className="playlist container text-white">
//     <div className="row playlist-header justify-content-center align-items-center">
//       <div className="col">Song</div>
//       <div className="col">Artist</div>
//     </div>
//     {props.playlist.map((song) => {
//       return (
//     <div className="row playlist-row justify-content-center align-items-center">
//       <div className="col playlist-title">{song.title}</div>
//       <div className="col playlist-artist">{song.artist}</div>
//     </div>
//       )
//     })}
//   </div>
// ) */}

/* 
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
   */