import React from 'react';

function SavePlaylist(props) {
    const handleClick = (e) => {
        e.preventDefault();
        const tracks = props.playlist.map(t => t.trackid);
        fetch(`/api?do=savePlaylist&access_token=${encodeURIComponent(props.access_token)}&trackids=${encodeURIComponent(tracks)}`)
        .then((res) => res.json())
        .then((pid) => {
            console.log("New playlist ID: ", pid);
        })
        .catch((err) => {
            console.log("ERROR: ",err);
        });
    };
    return (
            <button onClick={e => { handleClick(e) }}>
            I love it keep it forever
        </button>
    )
}

export default SavePlaylist;
