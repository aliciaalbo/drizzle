import React from 'react';
import Form from 'react-bootstrap/Form';

function LatLonSearch(props) {
  //const [lat, setLat] = useState("");
  //const [isError, setisError] = useState(false);

  //  function handleSubmit(e) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.fetchWeatherLatLon(e.target.lat.value, e.target.lon.value);
    //setLat("")
    //setisError(false);
  };

  return (
    <div className="searchbar">
    <Form variant="dark" className="search-form" onSubmit={e => { handleSubmit(e) }}>
  <div className="input-group">
    <input variant="dark" type="text" className="form-control" name="lat" defaultValue={props.lat} placeholder="Latitude" required />
    <input variant="dark" type="text" className="form-control" name="lon" defaultValue={props.lon} placeholder="Longitude" required />
    <div className="input-group-append">
      <button variant="dark" className="btn btn-secondary" type="button">
        <i className="fa fa-search"></i>
      </button>
    </div>
  </div>
    </Form>
  </div>

      // <Form variant="dark" className="search" onSubmit={e => { handleSubmit(e) }}>
      //   Latitude: <input type="text" name="lat" defaultValue={props.lat} required /> 
      //   Longitude: <input type="text" name="lon" defaultValue={props.lon} required />
      //   <Button className="custom-btn-light" type="submit" > <i className="fas fa-search"></i> </Button>
      // </Form>
  );
}

export default LatLonSearch;