import React, { useState } from 'react';

function showConditions(props) {
    console.log(props.weather)
    let url=`http://openweathermap.org/img/wn/${props.icon}@2x.png`

  return(
    <div>
        <div>
            {props.weather}
        </div>
        <div>
            {props.city}
        </div>
        <div>    
        <img src={url} />
        </div>
    </div>
  )
}

export default showConditions;
