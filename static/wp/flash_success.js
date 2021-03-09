import React from 'react';
import FlashMessage from 'react-flash-message';
 

function Success(){
    return(
    <FlashMessage duration={5000} persistOnHover={true}>
    <p class="text-white">Success! Go to Spotify to view your playlist</p>
    </FlashMessage>)
}

export default Success;