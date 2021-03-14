import React from 'react';
import Button from 'react-bootstrap/Button';

// props: access_token, webplayer, playerstate
function SpotPlayer(props) {
    console.log('spotplayer:',props);
    //const deviceId = props.webplayer.player._options.id;
    const deviceId = props.deviceId;
    function play(e) {
        e.preventDefault();
        const body = JSON.stringify({ uris: props.playstate.uris, offset: { position: props.playstate.offset } });

        props.setPlaybackToggle('yes');
        console.log('playing first time',deviceId,body);
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
    console.log('Set to next track!');
        });
    }   

    return (
      <div className="container">
        <div className="player-controls row justify-content-center flex-nowrap">
          <Button className="custom-btn-light" onClick={e => { prev(e) }}><i className="fa fa-backward fa-2x"></i></Button>
          {props.playbackToggle === 'yes' ?
            <Button className="custom-btn-light" variant="dark" onClick={e => { pause(e) }}><i className={
                props.isPaused === false ? 'fas fa-pause fa-2x' : 'fas fa-play fa-2x' 
            }></i></Button>
            :
            <Button className="custom-btn-light" variant="dark" onClick={e => { play(e) }}><i className="fas fa-play fa-2x"></i></Button>
          }
          <Button className="custom-btn-light" variant="dark" onClick={e => { next(e) }}><i className="fas fa-forward fa-2x"></i></Button>
        </div>
      </div>
    )
}

export default SpotPlayer;