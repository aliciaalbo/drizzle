
// import * as React from 'react';

// export function useSpotifyWebSdk({
//   name,
//   getOAuthToken,
//   accountError = noop,
//   onReady = noop,
//   onPlayerStateChanged = noop,
// }) {
//   const [isReady, setIsReady] = React.useState(false);
//   const [deviceId, setDeviceId] = React.useState<string>('');
//   const playerRef = React.useRef<Spotify.SpotifyPlayer | null>(null);

//   React.useEffect(() => {
//     if (window.Spotify) {
//       playerRef.current = new Spotify.Player({
//         name,
//         getOAuthToken: async cb => {
//           const token = await getOAuthToken();
//           cb(token);
//         },
//       });
//       setIsReady(true);
//     }

//     (window as any).onSpotifyWebPlaybackSDKReady = () => {
//       playerRef.current = new Spotify.Player({
//         name,
//         getOAuthToken: async cb => {
//           const token = await getOAuthToken();
//           cb(token);
//         },
//       });
//       setIsReady(true);
//     };

//     if (!window.Spotify) {
//       const scriptTag = document.createElement('script');
//       scriptTag.src = 'https://sdk.scdn.co/spotify-player.js';

//       document.head!.appendChild(scriptTag);
//     }
//   }, []);

//   const handleReady = React.useCallback(({ device_id: readyDeviceId }) => {
//     setDeviceId(readyDeviceId);

//     if (onReady) {
//       onReady(deviceId);
//     }
//   }, []);

//   React.useEffect(
//     () => {
//       if (isReady) {
//         playerRef.current!.connect();
//       }
//     },
//     [isReady],
//   );

//   React.useEffect(
//     () => {
//       const player = playerRef.current!;
//       if (isReady) {
//         player.addListener('account_error', accountError);
//         player.addListener('ready', handleReady);
//         player.addListener('initialization_error', accountError);
//         player.addListener('authentication_error', accountError);
//         player.addListener('not_ready', accountError);
//         player.addListener('player_state_changed', onPlayerStateChanged);

//         return () => {
//           player.removeListener('account_error', accountError);
//           player.removeListener('ready', handleReady);
//           player.removeListener('player_state_changed', onPlayerStateChanged);
//         };
//       }

//       return;
//     },
//     [isReady, onPlayerStateChanged],
//   );

//   return {
//     player: playerRef.current,
//     deviceId,
//     isReady,
//   };
// }

// // import React from 'react';

// // function WebPlayer(props) {
// //   return (
// //     <WebPlayer>
// //       <div>Playa</div>
// //     </WebPlayer>
// //   );
// // };

// // export default WebPlayer;


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