import React from 'react';

function Reroll(props) {
     const handleClick = (e) => {
       e.preventDefault();
       props.fetchWeather(props.zipcode)

     };
    return (
            <button onClick={e => { handleClick(e) }}>
            I hate it
        </button>
    )
}

export default Reroll;
