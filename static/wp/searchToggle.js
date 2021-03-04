import React from 'react';

function SearchToggle(props) {

  //  function handleSubmit(e) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.searchToggle()
    };


  return (
      <section>
        {props.toggle === "US" ? <button onClick={e => { handleSubmit(e) }}>
            Not in the US? Try the Lat/Long search!
        </button> : <button onClick={e => { handleSubmit(e) }}>
        In the US? Try zip code search
        </button>}
    </section>
  );
}

export default SearchToggle;