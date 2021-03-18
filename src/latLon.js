import React from 'react';
import Form from 'react-bootstrap/Form';

function LatLonSearch(props) {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.fetchWeatherLatLon(e.target.lat.value, e.target.lon.value);
  };

  return (
    <div className="searchbar">
    <Form variant="dark" className="search-form" onSubmit={e => { handleSubmit(e) }}>
  <div className="input-group">
    <input variant="dark" type="text" className="form-control" name="lat" defaultValue={props.lat} placeholder="Latitude" required />
    <input variant="dark" type="text" className="form-control" name="lon" defaultValue={props.lon} placeholder="Longitude" required />
    <div className="input-group-append">
      <button variant="dark" className="btn btn-secondary" type="submit">
        <i className="fa fa-search"></i>
      </button>
    </div>
  </div>
    </Form>
  </div>

  );
}

export default LatLonSearch;