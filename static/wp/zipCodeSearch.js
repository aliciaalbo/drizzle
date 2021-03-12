import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function ZipCodeSearch(props) {

  //  function handleSubmit(e) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.fetchWeather(e.target.zipcode.value);
  };

  return (
      <Form className="search" onSubmit={e => { handleSubmit(e) }}>
        Zip code: <input type="text" name="zipcode" defaultValue={props.zipcode} required /> <Button variant="dark" className="custom-btn-light" type="submit"><i className="fas fa-search"></i> </Button>
      </Form>
  );
}

export default ZipCodeSearch;

