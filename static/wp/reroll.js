import React from 'react';
import Button from 'react-bootstrap/Button';

function Reroll(props) {
     const handleClick = (e) => {
      e.preventDefault();
      props.fetchWeather(props.zipcode);
      // if we want to prevent duplicates, uncomment this and comment it in savePlaylist.js
      //props.setPid("");
     };
    return (

            <Button variant="dark" className="custom-btn-control" onClick={e => { handleClick(e) }}><i className="fas fa-redo"></i>&nbsp;
            New Mix
            </Button>

    )
}


{/* <div style={{ display: "flex" }}>
<Button style={{ marginRight: "auto" }} onClick={e => { handleClick(e) }}>
New Mix
</Button>
</div> */}
export default Reroll;
