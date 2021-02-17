import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'; 


export function ZipCodeSearch() {
  const [zipcode, setZipcode] = useState("");

  useEffect(() => {
    // sanitize this first! doy
    console.log('z2',zipcode);
    console.log('starting fetch');
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${encodeURIComponent(zipcode)},us&appid={appid}`)
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

//       // Note: it's important to handle errors here
    //       // instead of a catch() block so that we don't swallow
    //       // exceptions from actual bugs in components.
    //       (error) => {
    //         setIsLoaded(true);
    //         setError(error);
    //       }
    //     )
    // }, [])
  
    // if (error) {
    //   return <div>Error: {error.message}</div>;
    // } else if (!isLoaded) {
    //   return <div>Loading...</div>;
    // } else {
    //   return (
    //     <ul>
    //       {items.map(item => (
    //         <li key={item.id}>
    //           {item.name} {item.price}
    //         </li>
    //       ))}
    //     </ul>
    //   );
    // }
  // }




// function ZipcodeSearch(props) {
//     function getWeather(zipcode) {
//         url = 'api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}';
//         $.get(url, (result) => {
//             createPlaylist(result);
//         });
//     }


