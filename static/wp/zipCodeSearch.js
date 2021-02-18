import React, { useState } from 'react';

function ZipCodeSearch({ fetchWeather }) {
 const [zipcode, setZipcode] = useState();

  //  function handleSubmit(e) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.zipcode.value);
    fetchWeather(e.target.zipcode.value);
 //   setZipcode(e.target.zipcode.value);
  };

  return (
      <form onSubmit={e => { handleSubmit(e) }}>
        Zip code: <input type="text" name="zipcode" value={zipcode} required /> <input type="submit" /> 
      </form>
  );
}

export default ZipCodeSearch;

/*
  useEffect(() => {
    if (zipcode) {
      // sanitize this first! doy
      console.log('z2',zipcode);
      console.log('starting fetch');
      fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${encodeURIComponent(zipcode)},us&appid=3d00fac31853cdfa5a9913bcd89a25bd`)
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          console.log(data.weather);
          console.log(data.weather[0]);
          console.log(data.weather[0].main);
          console.log(data.weather[0].icon);
          console.log(data.name);
          // pass weather to python get playlist back
          fetch(`/api?do=zipcodeToPlaylist&weather=${data.weather[0].main}&city=${data.name}&icon=${data.weather[0].icon}`)
            .then((res) => {
              console.log('res:',res)
            })
            .then((playlist) => {
              console.log('pl:',playlist)
            })
            
        })
        .catch((err) => {
          console.log("ERROR: ",err);
        });
    }
  }, [zipcode]);
*/

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