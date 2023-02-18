import React from "react";
import './Nav.css'
import { useNavigate } from "react-router-dom";


function NavBar() {

  let navigate = useNavigate()

  return (
    <div id='app-navbar'>
      <div 
        id="app-navbar-title-box"
        className="app-navbar-box"
        onClick={() => navigate('/')}
        style={{
          cursor:'pointer',
        }}
      >
        <span
          id='app-navbar-title'
          style={{
            fontSize:'30px',
            fontWeight: '400'
          }}
          >
          {"Programmer's Garage </>"}
        </span>
      </div>
    </div>
  );
}
  
export default NavBar;