import React, { useState, useEffect, useRef, useCallback } from 'react';

function WebPlayer(props) {
  const [isReady, setIsReady] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const playerRef = useRef();
  useEffect(() => {
    // already loaded, we are rolling a new token probably
    if (window.Spotify) {
      playerRef.current = new Spotify.Player({
        name: 'Moody Playlist Web App',
        volume: 1.0,
        getOAuthToken: cb => {
          cb(props.access_token);
        },
      });
      setIsReady(true);
    }

    // instantiate on script load
    // const instantiatePlayer = (props.access_token) => {
    //if (props.access_token) {
    window.onSpotifyWebPlaybackSDKReady = () => {
      playerRef.current = new Spotify.Player({
        name: 'Moody Playlist Web App',
        volume: 1.0,
        getOAuthToken: (cb) => {
          console.log('at:',props.access_token);
          cb(props.access_token);
        },
      });
      setIsReady(true);
    };

    // script needs to be added dynamically within React so the
    // window.onSpotifyWebPlaybackSDKReady function is immediately available to run
    // once the spotify-player.js finishes loading
    if (!window.Spotify) {
      const scriptTag = document.createElement('script');
      scriptTag.src = 'https://sdk.scdn.co/spotify-player.js';
      document.head.appendChild(scriptTag);
    }

    console.log('playa:',playerRef.current);
  }, []);

  const handleReady = useCallback(({ device_id: readyDeviceId }) => {
    setDeviceId(readyDeviceId);
    // if (onReady) {
    //   onReady(deviceId);
    // }
  }, []);

  // connect once ready
  useEffect(() => {
    if (isReady) {
      playerRef.current.connect();
    }
  }, [isReady]);

  // const handleReady = useCallback(({ device_id: readyDeviceId }) => {
  //   setDeviceId(readyDeviceId);
  //   if (props.onReady) {
  //     props.onReady(deviceId);
  //   }
  // }, []);

  // connect player once instantiated
  useEffect(() => {
    const player = playerRef.current;
    if (isReady) {
      player.addListener('account_error', accountError);
      player.addListener('ready', handleReady);
      player.addListener('initialization_error', accountError);
      player.addListener('authentication_error', accountError);
      player.addListener('not_ready', accountError);
      player.addListener('player_state_changed', onPlayerStateChanged);

      return () => {
        player.removeListener('account_error', accountError);
        player.removeListener('ready', handleReady);
        player.removeListener('player_state_changed', onPlayerStateChanged);
      };
    }
    return;
  }, [isReady, onPlayerStateChanged]);

    //     // Error handling
    //     player.addListener('initialization_error', ({ message }) => { console.error(message); });
    //     player.addListener('authentication_error', ({ message }) => { console.error(message); });
    //     player.addListener('account_error', ({ message }) => { console.error(message); });
    //     player.addListener('playback_error', ({ message }) => { console.error(message); });

    //     // Playback status updates
    //     player.addListener('player_state_changed', state => { console.log(state); });

    //     // Ready
    //     player.addListener('ready', ({ device_id }) => {
    //       setDeviceId(device_id);
    //       console.log('Ready with Device ID', device_id);
    //     });

    //     // Not Ready
    //     player.addListener('not_ready', ({ device_id }) => {
    //       console.log('Device ID has gone offline', device_id);
    //     });
    //     return;
    //   },
    //   [isReady, onPlayerStateChanged],
    // );
        // finally, connect the player
//        playerRef.current.connect();
// }
//     }, [isReady],
//   );

  // React.useEffect(
  //   () => {
  //     const player = playerRef.current;
  //     if (isReady) {
  //       player.addListener('account_error', accountError);
  //       player.addListener('ready', handleReady);
  //       player.addListener('initialization_error', accountError);
  //       player.addListener('authentication_error', accountError);
  //       player.addListener('not_ready', accountError);
  //       player.addListener('player_state_changed', onPlayerStateChanged);

  //       return () => {
  //         player.removeListener('account_error', accountError);
  //         player.removeListener('ready', handleReady);
  //         player.removeListener('player_state_changed', onPlayerStateChanged);
  //       };
  //     }

  //     return;
  //   },
  //   [isReady, onPlayerStateChanged],
  // );

  return {
    player: playerRef.current,
    deviceId: deviceId,
    isReady
  };
};

export default WebPlayer;

// function WebPlayer(props) {
//   React.useEffect(() => {
//     if (props.access_token) {
//       window.onSpotifyWebPlaybackSDKReady = () => {
//         props.player = new window.Spotify.Player({
//           name: 'Moody Playlist Web App',
//           volume: 1.0,
//           getOAuthToken: (cb) => {
//             console.log('at:',access_token);
//             // console.log('accessToken', localStorage.getItem('accessToken'));
//             // const token = localStorage.getItem('accessToken');
//             cb(props.access_token);
//           },
//         });
//       };
//       if (!window.Spotify) {
//         const scriptTag = document.createElement('script');
//         scriptTag.src = 'https://sdk.scdn.co/spotify-player.js';
//         document.head.appendChild(scriptTag);
//       }
//     }
//     console.log('in use effect');
//   });

//   return (
//     <div>Playa</div>
//   );
// };


// // import React from 'react';
// // import useSpotifyWebPlaybackSdk from "use-spotify-web-playback-sdk";

// // function WebPlayer(props) {
// //   const {
// //     // Script: WebPlaybackSdkScript,
// //     deviceId,
// //     connect: connectWebPlaybackSdk,
// //     player, 
// //     isReady,
// //   } = useSpotifyWebPlaybackSdk({
// //     name: 'Moody Playlist Web App',
// //     volume: 1.0,
// //     getOAuthToken: () => Promise.resolve(props.access_token),
// //     onPlayerStateChanged: (playerState) => {
// //       console.log('player state changed:', playerState);
// //     }
// //   });
// //   React.useEffect(
// //     () => {
// //       if (isReady) {
// //         connect();
// //       }
// //     },
// //     [isReady],
// //   );

// //   return (
// //     <WebPlayer>
// //       <div>Any children</div>
// //     </WebPlayer>
// //   );
// // };

// // export default WebPlayer;
//   // const player = new window.Spotify.Player({
//   //     name: 'Moody Playlist Web App',
//   //     volume: 1.0,
//   //     getOAuthToken: cb => { cb(props.access_token); }
//   //   });
  
//   //   // Error handling
//   //   player.addListener('initialization_error', ({ message }) => { console.error(message); });
//   //   player.addListener('authentication_error', ({ message }) => { console.error(message); });
//   //   player.addListener('account_error', ({ message }) => { console.error(message); });
//   //   player.addListener('playback_error', ({ message }) => { console.error(message); });
  
//   //   // Playback status updates
//   //   player.addListener('player_state_changed', state => { console.log(state); });
  
//   //   // Ready
//   //   player.addListener('ready', ({ device_id }) => {
//   //     console.log('Ready with Device ID', device_id);
//   //   });
  
//   //   // Not Ready
//   //   player.addListener('not_ready', ({ device_id }) => {
//   //     console.log('Device ID has gone offline', device_id);
//   //   });
  
//   //   // Connect to the player!
//   //   player.connect();