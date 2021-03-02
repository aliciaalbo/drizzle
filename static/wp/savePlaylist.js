import React from 'react';
import { useState } from "react";
import Failure from "./flash_failure"
import Success from "./flash_success"

// import FlashMessage from "react-flash-message";

function SavePlaylist(props) {
    const [pid, setPid] = useState("");
    const [isError, setisError] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        const tracks = props.playlist.map(t => t.trackid);
        fetch(`/api?do=savePlaylist&access_token=${encodeURIComponent(props.access_token)}&trackids=${encodeURIComponent(tracks)}`)
        .then((res) => res.json())
        .then((pid) => {
            console.log("New playlist ID: ", pid);
            setPid(pid)
        })
        .catch((err) => {
            console.log("ERROR: ",err);
        });
    };
    return (
        <section>
            <button onClick={e => { handleClick(e) }}>
            I love it keep it forever
            </button>
            {pid ? <Success /> : null }
            {isError ? <Failure /> : null }
        </section>
    )
}

export default SavePlaylist;
