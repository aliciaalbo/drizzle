import React from 'react';
import FlashMessage from 'react-flash-message';
 

function BadZip(){
    return(
    <FlashMessage duration={5000} persistOnHover={true}>
    <p class="text-white">Please enter a valid zip code.</p>
    </FlashMessage>)
}

export default BadZip;