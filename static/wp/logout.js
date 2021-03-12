import React from 'react';
import Button from 'react-bootstrap/Button';

function Logout(props) {
    const handleClick = (e) => {
        e.preventDefault();
        props.logoutUser(props.email);
    };
    return (
        <Button className="btn mr-3" variant="success" onClick={e => { handleClick(e) }}><i className="fab fa-spotify"></i>&nbsp;
          logout 
        </Button>
    )
}

export default Logout;
