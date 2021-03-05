import React from 'react';

function ZipCodeSearch(props) {

  //  function handleSubmit(e) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.fetchWeather(e.target.zipcode.value);
  };

  return (
      <form onSubmit={e => { handleSubmit(e) }}>
        Zip code: <input type="text" name="zipcode" defaultValue={props.zipcode} required /> <input type="submit" /> 
      </form>
  );
}

export default ZipCodeSearch;