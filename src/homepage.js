import React from 'react';
import ReactDOM from 'react-dom'; 
import Login from LoginForm;

function Homepage() {
  return (
    <div>
      <p>Welcome, user!</p>
      <img src = "someimage"></img>
    </div>
  );
}



ReactDOM.render(  (
   <div>
     <Homepage />
     <Login />
   </div>
), document.getElementById('app'));