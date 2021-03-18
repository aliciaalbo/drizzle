import React from 'react';
//import Button from 'react-bootstrap/Button';

function Reroll(props) {
     const handleClick = (e) => {
      e.preventDefault();
      props.fetchWeather(props.zipcode);
      // if we want to prevent duplicates, uncomment this and comment it in savePlaylist.js
      //props.setPid("");
     };
    return (

            <button className="btn-actions justify-content-center flex-nowrap" onClick={e => { handleClick(e) }}><i className="fas fa-redo fa-2x"></i>
            <span>New Mix</span></button>

    )
}


export default Reroll;
