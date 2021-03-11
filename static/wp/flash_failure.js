import React from 'react';
import FlashMessage from 'react-flash-message';
import Alert from 'react-bootstrap/Alert'
 

function Failure(){
    return(
    <FlashMessage duration={5000} persistOnHover={true}>
    <Alert variant="dark">Something went wrong! Try logging out and loggin in again.</p>
    </FlashMessage>)
}

export default Failure;