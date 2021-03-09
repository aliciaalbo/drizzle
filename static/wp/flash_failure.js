import React from 'react';
import FlashMessage from 'react-flash-message';
 

function Failure(){
    return(
    <FlashMessage duration={5000} persistOnHover={true}>
    <p class="text-white">Something went wrong! Try logging out and loggin in again.</p>
    </FlashMessage>)
}

export default Failure;