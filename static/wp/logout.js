import React from 'react';
import Button from 'react-bootstrap/Button';

function Logout(props) {
    const handleClick = (e) => {
        e.preventDefault();
        props.logoutUser(props.email);
    };
    return (
        <Button  variant="dark" className="custom-btn-control" onClick={e => { handleClick(e) }}><i className="fab fa-spotify fa-2x"></i>&nbsp;
          logout 
        </Button>
    )
}

export default Logout;
