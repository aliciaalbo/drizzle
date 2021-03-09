import React from 'react';
import Button from 'react-bootstrap/Button';

function SearchToggle(props) {

  //  function handleSubmit(e) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.searchToggle()
    };


  return (
      <section>
        {props.toggle === "US" ? <Button onClick={e => { handleSubmit(e) }}>
            Not in the US? Try the Lat/Long search!
        </Button> : <Button onClick={e => { handleSubmit(e) }}>
        In the US? Try zip code search
        </Button>}
    </section>
  );
}

export default SearchToggle;