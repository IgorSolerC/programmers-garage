import React, {Component} from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css'

import NavBar from './Nav';
import Background from './Background';
import Home from './home/Home'
import Wordle from './wordle/Wordle'


class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <NavBar/>
        <Background/>
        <div id='main'>
          <Routes>
            <Route path="/Experimento-React/" element={<Home/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/wordle" element={<Wordle/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;