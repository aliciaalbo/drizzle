import React from 'react';
import Button from 'react-bootstrap/Button';

function Reroll(props) {
     const handleClick = (e) => {
       e.preventDefault();
       props.fetchWeather(props.zipcode)

     };
    return (
            <Button onClick={e => { handleClick(e) }}>
            New Mix
        </Button>
    )
}

export default Reroll;
