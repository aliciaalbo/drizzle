import React from 'react';

// props: access_token, webplayer, playerstate
function SpotPlayer(props) {
    console.log('spotplayer:',props);
    const deviceId = props.webplayer.player._options.id;
    function play(e) {
        e.preventDefault();
        const body = JSON.stringify({ uris: props.playstate.uris, offset: { position: props.playstate.offset } });
        return fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
            method: 'PUT',
            body: body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.access_token}`
            },
        });
    }
    return (
        <section>
            <button onClick={e => { play(e) }}>Play</button>
        </section>
    )
}

export default SpotPlayer;