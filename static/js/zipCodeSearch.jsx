import React from 'react';
import ReactDOM from 'react-dom'; 

function MyComponent() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    
    let countryCode = "us";
    let zipcode
    getWeather(() => {
      fetch("api.openweathermap.org/data/2.5/weather?zip={zipcode},{countryCode}&appid=9147393c8b04e841138696bc84e37bc5")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      );
    }
  }




function ZipcodeSearch(props) {
    function getWeather(zipcode) {
        url = 'api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}';
        $.get(url, (result) => {
            createPlaylist(result);
        });
    }

    return (
        <form onSubmit={getWeather}>
        Zip code: <input type="text" name="zip" required> <input type="submit">
        </form>
    );
}
