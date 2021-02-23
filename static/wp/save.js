import React, { useState } from 'react';

function Save() {

  const handleClick = (e) => {
     e.preventDefault();
     console.log("BALLS");

     var scopes = 'user-read-private user-read-email';
     window.location.href='https://accounts.spotify.com/authorize?response_type=code' +
     '&client_id=8e55de46675c4563830a205d05fc767a' +
     (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
     '&redirect_uri=' + encodeURIComponent('http://localhost:3000');
  };

  return (
    <button onClick={e => { handleClick(e) }}>
    button of your mom's butt
</button>
  )
}

export default Save

// import React, { useState } from 'react'
// import Pizzly from 'pizzly-js'
// import Profile from './Profile'
// const Player = () => {
//   const [profile, setProfile] = useState()
//   return (
//     <div className="Profile">
//       <h1>Hello!</h1>
//       <p>
//         Click the button bellow to retrieve your GitHub profile using{' '}
//         <a target="_blank" rel="noopener noreferrer" href="https://github.com/Bearer/Pizzly">
//           Pizzly
//         </a>
//         .
//       </p>
//       <button onClick={connect}>Retrieve your GitHub profile</button>
//       {profile && <Profile profile={profile} />}
//     </div>
//   )
// };
// export default App;