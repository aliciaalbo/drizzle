//import React, { useState } from 'react';
import React from 'react';

function Reroll(props) {
//    const [zipcode, setZipcode] = useState();

     const handleClick = (e) => {
       e.preventDefault();
       console.log("BUTT")
       props.fetchWeather(props.zipcode)

     };
    return (
            <button onClick={e => { handleClick(e) }}>
            I hate it
        </button>
    )
}

export default Reroll
