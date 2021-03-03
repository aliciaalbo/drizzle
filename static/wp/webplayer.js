// import React from 'react';

// function WebPlayer(props) {
//   // React.useEffect(() => {
//   //   window.onSpotifyWebPlaybackSDKReady = () => {
//   //     playerRef = new window.Spotify.Player({
//   //       name: 'Moody Playlist Web App',
//   //       volume: 1.0,
//   //       getOAuthToken: (cb) => {
//   //         // console.log('accessToken', localStorage.getItem('accessToken'));
//   //         // const token = localStorage.getItem('accessToken');
//   //         cb(access_token);
//   //       },
//   //     });
//   //   };
//   //   if (!window.Spotify) {
//   //     const scriptTag = document.createElement('script');
//   //     scriptTag.src = 'https://sdk.scdn.co/spotify-player.js';
//   //     document.head.appendChild(scriptTag);
//   //   }
//   // }, [props.access_token]);

//   return (
//     <WebPlayer>
//       <div>Playa</div>
//     </WebPlayer>
//   );
// };

// export default WebPlayer;
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