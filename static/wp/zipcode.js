import React, { useState, useEffect } from 'react';

function ZipCodeSearch() {
  const [zipcode, setZipcode] = useState('')


  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=3d00fac31853cdfa5a9913bcd89a25bd`)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log("ERROR: ",err);
    });
}, []);

    
  return (
    <button onClick={alertMessage}>
      Click me
    </button>
  );
}


export function ZipCodeSearch() {
  const [zipcode, setZipcode] = useState("");

  useEffect(() => {
    // sanitize this first! doy
    console.log('z2',zipcode);
    console.log('starting fetch');
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${encodeURIComponent(zipcode)},us&appid=3d00fac31853cdfa5a9913bcd89a25bd`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
      })
      .catch((err) => {
        console.log("ERROR: ",err);
      });
  }, []);

  //  function handleSubmit(e) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.zipcode.value);
    setZipcode(e.target.zipcode.value);
  };

  return (
        <form onSubmit={handleSubmit}>
        Zip code: <input type="text" name="zipcode" required /> <input type="submit" /> 
        </form>
  );
}
