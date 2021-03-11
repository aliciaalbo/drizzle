import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
      <Form variant="dark" className="search" onSubmit={e => { handleSubmit(e) }}>
        Latitude: <input type="text" name="lat" defaultValue={props.lat} required /> 
        Longitude: <input type="text" name="lon" defaultValue={props.lon} required />
        <Button className="custom-btn-light" type="submit" > <i class="fas fa-search"></i> </Button>
      </Form>
  );
}

export default LatLonSearch;