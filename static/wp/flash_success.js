import React from 'react';
import FlashMessage from 'react-flash-message';
import Alert from 'react-bootstrap/Alert';
 

function Success(){
    return(
    <FlashMessage duration={5000} persistOnHover={true}>
    <Alert variant="dark"> class="text-white">Success! Go to Spotify to view your playlist</Alert>
    </FlashMessage>)
}

export default Success;