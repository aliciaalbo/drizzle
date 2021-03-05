import React, {useState} from 'react';

function LatLonSearch(props) {
  const [lat, setLat] = useState("");
  const [isError, setisError] = useState(false);

  //  function handleSubmit(e) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.fetchWeatherLatLon(e.target.lat.value, e.target.lon.value);
    setLat("")
    setisError(false);
  };

  return (
      <form onSubmit={e => { handleSubmit(e) }}>
        Latitude: <input type="text" name="lat" defaultValue={props.lat} required /> 
        Longitude: <input type="text" name="lon" defaultValue={props.lon} required />
        <input type="submit" /> 
      </form>
  );
}

export default LatLonSearch;