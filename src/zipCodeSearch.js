import React from 'react';
import Form from 'react-bootstrap/Form';


function ZipCodeSearch(props) {

  //  function handleSubmit(e) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.fetchWeather(e.target.zipcode.value);
  };

  return (
  <div className="searchbar">
    <Form variant="dark" className="search-form" onSubmit={e => { handleSubmit(e) }}>
  <div className="input-group">
    <input variant="dark" type="text" className="form-control" name="zipcode" defaultValue={props.zipcode} placeholder="Zip Code" required />
    <div className="input-group-append">
      <button variant="dark" className="btn btn-secondary" type="submit">
        <i className="fa fa-search"></i>
      </button>
    </div>
  </div>
    </Form>
  </div>

      // <Form className="search" onSubmit={e => { handleSubmit(e) }}>
      //   Zip code: <input type="text" name="zipcode" defaultValue={props.zipcode} required /> <Button variant="dark" className="custom-btn-light" type="submit"><i className="fas fa-search"></i> </Button>
      // </Form>
  );
}

export default ZipCodeSearch;

