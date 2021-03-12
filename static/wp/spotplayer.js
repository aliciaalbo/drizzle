import React from 'react';
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
          <div className="player-controls">
         <Button className="custom-btn-light" variant="dark" onClick={e => { prev(e) }}><i className="fas fa-backward"></i></Button>
         {props.playbackToggle === 'yes' ?
            <Button className="custom-btn-light" variant="dark" onClick={e => { pause(e) }}><i className="fas fa-play"></i> / <i className="fas fa-pause"></i></Button>
            :
            <Button className="custom-btn-light"variant="dark" onClick={e => { play(e) }}><i className="fas fa-play"></i></Button>
        }
        <Button className="custom-btn-light" variant="dark" onClick={e => { next(e) }}><i className="fas fa-forward"></i></Button>
          </div>
    {/* <div id="app-cover">
        <div id="player">
            <div id="player-content">
                <div id="album-art">
                    <img src="https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg" id="_1" />
                    <div id="buffer-box">Buffering ...</div>
                </div>
                <div id="player-controls">
                    <div className="control">
                        <div className="button" id="play-previous">
                            <i className="fas fa-backward"></i>
                        </div>
                    </div>
                    <div className="control">
                        <div className="button" id="play-pause-button">
                            <i className="fas fa-play"></i>
                        </div>
                    </div>
                    <div className="control">
                        <div className="button" id="play-next">
                            <i className="fas fa-forward"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> */}
          </section>

        // <Button className="custom-btn-light" variant="dark" onClick={e => { prev(e) }}><i className="fas fa-backward"></i></Button>
        // {props.playbackToggle === 'yes' ?
        //     <Button className="custom-btn-light" variant="dark" onClick={e => { pause(e) }}><i className="fas fa-play"></i> / <i className="fas fa-pause"></i></Button>
        //     :
        //     <Button className="custom-btn-light"variant="dark" onClick={e => { play(e) }}></Button>
        // }
        // <Button className="custom-btn-light" variant="dark" onClick={e => { next(e) }}><i className="fas fa-forward"></i></Button>

    //   <section>
    //     <Button className="custom-btn-light" variant="dark" onClick={e => { prev(e) }}><i className="fas fa-backward"></i>Previous</Button>
    //     {props.playbackToggle === 'yes' ? <Button className="custom-btn-light" variant="dark" onClick={e => { pause(e) }}><i className="fas fa-play"></i><i className="fas fa-pause"></i>Play/Pause</Button> : <Button className="custom-btn-light"variant="dark" onClick={e => { play(e) }}>Play</Button>}
    //     <Button className="custom-btn-light" variant="dark" onClick={e => { next(e) }}><i className="fas fa-forward"></i>Next</Button>
    //   </section>
    )
}

export default SpotPlayer;