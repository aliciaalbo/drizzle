import { useState, useEffect, useRef } from 'react';

function WebPlayer(props) {
  //const [onReady, setOnReady] = useState(null);
  // not entirely sure how this works, but keeps the player from writing over itself
  const playerRef = useRef(null);
  console.log(props.deviceId);

  // creates an instance of the player
  useEffect(() => {
   if (props.access_token) {
    // already loaded, we are rolling a new token probably
    if (window.Spotify) {
      playerRef.current = new window.Spotify.Player({
        name: 'Moody Playlist Web App',
        volume: 1.0,
        getOAuthToken: cb => {
          cb(props.access_token);
        },
      });
      props.setIsReady(true);
      console.log('reloading');
    }

    // this function is called by the Spotify script once it is dynamically loaded
    window.onSpotifyWebPlaybackSDKReady = () => {
      playerRef.current = new window.Spotify.Player({
        name: 'Moody Playlist Web App',
        volume: 1.0,
        getOAuthToken: (cb) => {
          console.log('at:',props.access_token);
          cb(props.access_token);
        },
      });
      props.setIsReady(true);
      //setOnReady(window.Spotify.PlaybackStateListener);
      console.log('current set');
    };

    // needs to be added dynamically within React so the window.onSpotifyWebPlaybackSDKReady
    // function is read to be called by the spotify-player.js after loading
    if (!window.Spotify) {
      const scriptTag = document.createElement('script');
      scriptTag.src = 'https://sdk.scdn.co/spotify-player.js';
      document.head.appendChild(scriptTag);
      console.log('load script');
    }
    console.log('player details:',playerRef);
   }
  }, [props.access_token]);

  // const handleReady = useCallback(({ device_id: readyDeviceId }) => {
  //   setDeviceId(readyDeviceId);
  //   console.log('handleReady');
  // }, []);

  // connect to Spotify once the player is created
  useEffect(() => {
    const player = playerRef.current;
    // an async IIFE to immediate run a function, needed for await
    (async () => {
      if (props.isReady) {
        player.addListener('ready', ({ device_id: readyDeviceId }) => {
          props.setDeviceId(readyDeviceId);
          console.log('rdy deviceid', readyDeviceId);
        });
        player.addListener('player_state_changed', state => { console.log('state changed:',state); });
        // now connect
        let connected = await playerRef.current.connect();
        if (connected) {
          console.log('connected', playerRef.current);
        }
      }
    })();
  }, [props.isReady]);

  return {
    player: playerRef.current
  };
}

export default WebPlayer;