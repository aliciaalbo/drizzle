import React from 'react';
import Button from 'react-bootstrap/Button';

function SpotifyLogin() {
  const handleClick = (e) => {
    e.preventDefault();
    // to get account info for users: user-read-email
    // to save playlist: playlist-modify-public
    // to stream in player: streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state
    // to show the favorite button: user-library-read user-library-modify
    // also in there for some reason: user-read-currently-playing
    const scopes = 'user-read-email playlist-modify-public streaming user-read-private user-read-playback-state user-modify-playback-state user-library-read user-library-modify user-read-currently-playing';
    const callbackurl = window.location.origin + '/callback';
    window.location.href='https://accounts.spotify.com/authorize?response_type=code' +
    '&client_id=8e55de46675c4563830a205d05fc767a' +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(callbackurl);
  };

  return (
    <Button variant="success" onClick={e => { handleClick(e) }}>
      login with Spotify
    </Button>
  )
}



export default SpotifyLogin;
