import React from 'react';
import FlashMessage from 'react-flash-message';
 

function BadCoords(){
    return(
    <FlashMessage duration={5000} persistOnHover={true}>
    <p className="text-white">Please enter valid coordinates</p>
    </FlashMessage>)
}

export default BadCoords;