import React from 'react';

function showConditions(props) {
    console.log('weather:',props.weather);
    let url=`https://openweathermap.org/img/wn/${props.icon}@2x.png`;

  return(
    <div className="header-text">
        {props.username ? <div >
            {props.username}'s {props.weather} {props.city} playlist
        </div> : null}

        <div>
        <img src={url} />
        </div>
    </div>
  );
}

export default showConditions;
