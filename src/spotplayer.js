import React from 'react';


// props: access_token, webplayer, playerstate
function SpotPlayer(props) {
  console.log('spotplayer:',props);
  
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
    <div className="row player-controls justify-content-center flex-nowrap">
      <button className="col btn-controls btn-prev" onClick={e => { prev(e) }}><i className="fa fa-backward fa-2x"></i></button>
      {props.playbackToggle === 'yes' ?
        <button className="col btn-controls btn-playpause" onClick={e => { pause(e) }}><i className={
          props.isPaused === false ? "fas fa-pause fa-3x" : "fas fa-play-circle fa-3x"
        }></i></button>
      :
        <button className="col btn-controls btn-playpause" onClick={e => { play(e) }}><i className="fas fa-play-circle fa-3x"></i></button>
      }
      <button className="col btn-controls btn-next" onClick={e => { next(e) }}><i className="fas fa-forward fa-2x"></i></button>
    </div>
  )
}

export default SpotPlayer;