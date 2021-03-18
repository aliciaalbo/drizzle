import React from 'react';
import Button from 'react-bootstrap/Button';

function SearchToggle(props) {


  const handleSubmit = (e) => {
    e.preventDefault();
    props.searchToggle()
    };


  return (
      <section>
        {props.toggle === "US" ? <Button variant="link" onClick={e => { handleSubmit(e) }}>
            Not in the US? Try the Lat/Long search!
        </Button> : <Button  variant="link" onClick={e => { handleSubmit(e) }}>
        In the US? Try zip code search
        </Button>}
    </section>
  );
}

export default SearchToggle;