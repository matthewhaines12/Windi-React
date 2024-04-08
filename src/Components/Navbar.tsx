// sets up navbar and the buttons within it, also calls on the search function
import { useState } from "react";
import CustomIcon from "./CustomIcon";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { NavLink } from "react-router-dom";
import Search from "./Search";

interface LocationData {
  Array: {
    lon: number;
    lat: number;
  }[];
}

interface NavbarProps {
  onLocationUpdate: (newLocationData: LocationData) => void; //up
}

function Navbar({ onLocationUpdate }: NavbarProps) {
  /* Functional component for the Navbar*/
  const [click, setClick] =
    useState(false); /* State to manage the mobile menu visibility*/
  const handleClick = () =>
    setClick(!click); /*Function to toggle the mobile menu visibility*/
  const closeMobileMenu = () =>
    setClick(
      false
    ); /* Function to close the mobile menu when a link is clicked*/

  const handleLocationUpdate = (newLocationData: LocationData) => {
    // may not be necessary, ignore for now
    console.log("New location data:", newLocationData);
    onLocationUpdate(newLocationData);
  };
  // includes all the buttons for the different pages and calls on search
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
              <Search />

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
