import React from 'react';
// import { useState } from "react";
// import Failure from "./flash_failure"
// import Success from "./flash_success"
import Button from 'react-bootstrap/Button';

// import FlashMessage from "react-flash-message";

function SavePlaylist(props) {
    // const [pid, setPid] = useState("");
    // const [isError, setIsError] = useState(false);

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
            <Button variant="dark" className="custom-btn-control" onClick={e => { handleClick(e) }}>
            Save playlist to Spotify
            </Button>
            {/* <div>
            {pid ? <Success /> : null }
            {isError ? <Failure /> : null }
            </div> */}
        </div>
    )
}

export default SavePlaylist;
