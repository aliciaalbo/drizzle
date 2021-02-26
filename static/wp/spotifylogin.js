import React from 'react';

function SpotifyLogin() {
  const handleClick = (e) => {
     e.preventDefault();
     const scopes = 'user-read-playback-state user-read-currently-playing playlist-modify-public user-read-email';
     window.location.href='https://accounts.spotify.com/authorize?response_type=code' +
     '&client_id=8e55de46675c4563830a205d05fc767a' +
     (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
     '&redirect_uri=' + encodeURIComponent('http://localhost:5000/callback');
  };

  return (
    <button onClick={e => { handleClick(e) }}>
      login with Spotify
    </button>
  )
}

export default SpotifyLogin;
