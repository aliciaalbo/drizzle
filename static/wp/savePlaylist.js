import React from 'react';

function SavePlaylist(props) {
     const handleClick = (e) => {
       e.preventDefault();
       fetch(`/api?do=savePlaylist&playlist=${props.playlist}`)

     };
    return (
            <button onClick={e => { handleClick(e) }}>
            I love it keep it forever
        </button>
    )
}

export default SavePlaylist;
