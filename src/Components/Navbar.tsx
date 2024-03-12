import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { NavLink } from "react-router-dom";
import CustomIcon from "./CustomIcon";
import Search from "./Search"

interface CustomLocationData {
  Array: {
    lon: number;
    lat: number;
    // other properties if any
  }[];
}

interface LocationData {
  Array: {
    lon: number;
    lat: number;
    // other properties if any
  }[];
}

interface NavbarProps {
  onLocationUpdate: (newLocationData: LocationData) => void;
}

function Navbar({ onLocationUpdate }: NavbarProps) {
  /*functional component for the Navbar*/
  const [click, setClick] =
    useState(false); /* State to manage the mobile menu visibility*/
  const handleClick = () =>
    setClick(!click); /*Function to toggle the mobile menu visibility*/
  const closeMobileMenu = () =>
    setClick(
      false
    ); /* Function to close the mobile menu when a link is clicked*/
    
    const handleLocationUpdate = (newLocationData: LocationData) => {
      // Handle location update logic here
      console.log("New location data:", newLocationData);
      onLocationUpdate(newLocationData as CustomLocationData);
    };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <CustomIcon className="navbar-icon" />
              Windi
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              
              <Search onLocationUpdate={handleLocationUpdate}/>

              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/hourly"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Hourly
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/radar"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Radar
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
