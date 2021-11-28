import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import User from './components/UserComponent';
import Main from './components/MainComponent';

class App extends Component{
  constructor(props){
    super(props);
  }

render() { 
  return(
    <div>
      <Navbar dark color="primary">
        <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
        </div>
      </Navbar>
      <Main/>
    </div>
  );
}
}
export default App;
