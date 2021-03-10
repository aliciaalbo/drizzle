import React from 'react';
import Button from 'react-bootstrap/Button';

function Logout(props) {
    const handleClick = (e) => {
        e.preventDefault();
        props.logoutUser(props.email);
    };
    return (
        <Button class="btn mr-3" variant="success" onClick={e => { handleClick(e) }}>
            logout 
        </Button>
    )
}

export default Logout;
