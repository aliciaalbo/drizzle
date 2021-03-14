import React from 'react';

function showConditions(props) {
  console.log('weather:',props.weather);
  let url=`https://openweathermap.org/img/wn/${props.icon}@2x.png`;
  let pltitle = "";
  if (props.username) { pltitle = props.username+"'s "; }
  pltitle += '"'+props.weather+" in "+props.city+'" Playlist';

  return(
  <div className="playlist-headbar container"><div className="row playlist-headbar-row justify-content-center flex-nowrap">
    <div className="col-auto my-auto"><img className="playlist-weather" src={url} alt={props.weather} /></div>
    <div className="col-auto my-auto playlist-titlename">{pltitle}</div>
    <div className="col-auto my-auto"><img className="playlist-weather" src={url} alt={props.weather} /></div>
  </div></div>
  );
}

export default showConditions;
