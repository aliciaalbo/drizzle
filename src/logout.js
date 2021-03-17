import React from 'react';
//import Button from 'react-bootstrap/Button';

function Logout(props) {
    const handleClick = (e) => {
        e.preventDefault();
        props.logoutUser(props.email);
    };
    return (
        <button className="btn-actions justify-content-center flex-nowrap" onClick={e => { handleClick(e) }}><i className="fab fa-spotify fa-2x"></i>
        <span>Logout</span></button>
    )
}

export default Logout;
