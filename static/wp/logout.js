import React from 'react';

function Logout(props) {
    const handleClick = (e) => {
        e.preventDefault();
        props.logoutUser(props.access_token);
    };
    return (
        <button onClick={e => { handleClick(e) }}>
            logout 
        </button>
    )
}

export default Logout;
