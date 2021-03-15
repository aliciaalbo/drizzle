import React from 'react';
import FlashMessage from 'react-flash-message';
//import Alert from 'react-bootstrap/Alert';

function Failure(){
    return(
    <FlashMessage duration={5000} persistOnHover={true}>
    <div className="flashError">Something went wrong! Try logging out then logging back in.</div>
    </FlashMessage>
    )
}

export default Failure;