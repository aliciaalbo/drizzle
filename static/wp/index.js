import React from "react";
import ReactDOM from "react-dom";
import HelloWorld from "./HelloWorld";
import { Login } from "./loginForm";
import { ZipCodeSearch } from "./zipCodeSearch";
  
ReactDOM.render(<HelloWorld />, document.getElementById("react-root"));
ReactDOM.render(<Login />, document.getElementById("login"));
ReactDOM.render(<ZipCodeSearch />, document.getElementById("app"));
