import React from 'react';
import FlashMessage from 'react-flash-message';
import Alert from 'react-bootstrap/Alert';
 

function Failure(){
    return(
    <FlashMessage duration={5000} persistOnHover={true}>
    <Alert variant="warning">Something went wrong! Try logging out and loggin in again.</Alert>
    </FlashMessage>)
}

export default Failure;