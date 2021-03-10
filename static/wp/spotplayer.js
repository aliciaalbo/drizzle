import React, { useState, useEffect } from 'react';
// import useStickyState from "./useStickyState";
import Button from 'react-bootstrap/Button';

// props: access_token, webplayer, playerstate
function SpotPlayer(props) {

    console.log('spotplayer:',props);
    const deviceId = props.webplayer.player._options.id;
    function play(e) {
        e.preventDefault();
        const body = JSON.stringify({ uris: props.playstate.uris, offset: { position: props.playstate.offset } });

        props.setPlaybackToggle('yes');

        return fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
            method: 'PUT',
            body: body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.access_token}`
            },
        });
    }	
    function pause(e) {
        e.preventDefault();
        props.webplayer.player.togglePlay().then(() => {
            console.log('Toggled playback!');
          });
    }
    function prev(e) {
        e.preventDefault();
        props.webplayer.player.previousTrack().then(() => {
        console.log('Set to previous track!');
      });
    }
    function next(e) {
    e.preventDefault();
    props.webplayer.player.nextTrack().then(() => {
    console.log('Set to previous track!');
        });
    }   

    return (
        <section>
            {props.playbackToggle === 'yes' ? <Button onClick={e => { pause(e) }}><i class="fas fa-play"></i><i class="fas fa-pause"></i>Play/Pause</Button> : <Button onClick={e => { play(e) }}>Play</Button>}
            
            
            <Button onClick={e => { prev(e) }}><i class="fas fa-backward"></i>Previous</Button>
            <Button onClick={e => { next(e) }}><i class="fas fa-forward"></i>Next</Button>
        </section>
    )
}

export default SpotPlayer;