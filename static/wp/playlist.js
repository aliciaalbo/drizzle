import React, { useState } from 'react';

function ShowPlaylist(props) {
  return(
<div className="pane">
    <table >
      <tr>
        <th class="text-white">Song</th>
        <th class="text-white">Artist</th>
      </tr>
      {props.playlist.map((song) => {
        return <tr>
          <td class="text-white">{song.title}</td>
          <td class="text-white">{song.artist}</td>
        </tr>
      })}
    </table>
</div>
  )
}

export default ShowPlaylist;

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