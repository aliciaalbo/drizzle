import React from 'react';


function ShowPlaylist(props) {
  return (
    <div className="playlist container">
      {props.playlist.map((song, idx) => {
        return (
      <div className="playlist-row row" id={song.trackid} key={song.trackid}>
        <div className="playlist-number col-auto my-auto">{idx+1}</div>
        <div className="playlist-album col-auto my-auto"><img src="https://i.scdn.co/image/ab67616d0000b2737359994525d219f64872d3b1" /></div>
        <div className="playlist-trackinfo col my-auto">
          <div className="playlist-title">{song.title}</div>
          <div className="playlist-artist">{song.artist}</div>
        </div>
     </div>
        )}
      )}
    </div>
  )
}

/*
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
*/

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