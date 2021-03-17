import React from 'react';
//import Button from 'react-bootstrap/Button';

function SavePlaylist(props) {
    const handleClick = (e) => {
        e.preventDefault();
        const tracks = props.playlist.map(t => t.trackid);
        props.setPid("");
        props.setIsError(false);
        // if (props.pid) {
        //     props.setIsError(true);
        // } else {
            fetch(`/api?do=savePlaylist&access_token=${encodeURIComponent(props.access_token)}&trackids=${encodeURIComponent(tracks)}&username=${props.username}&weather=${props.weather}&city=${props.city}`)
            .then((res) => res.json())
            .then((pid) => {
                console.log("New playlist ID: ", pid);
                props.setPid(pid)
            })
            .catch((err) => {
                console.log("ERROR: ",err);
                props.setIsError(true)
            });
        // }
    };
    return (
        <div>
            <button className="btn-actions justify-content-center flex-nowrap" onClick={e => { handleClick(e) }}><i className="fas fa-cloud-upload-alt fa-2x"></i>
            <span>Save Playlist on Spotify</span>
            </button>
        </div>
    )
}

export default SavePlaylist;
