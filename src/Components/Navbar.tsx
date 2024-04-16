import CustomIcon from "./CustomIcon";
import { Link, NavLink } from "react-router-dom";
import Search from "./Search";
import "../Styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          <CustomIcon className="navbar-icon" />
          Windi
        </Link>
        <ul className="nav-menu">
          <li className="nav-search">
            <Search />
          </li>
          <li className="nav-item">
            <NavLink to="/" className="nav-links">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/radar" className="nav-links">
              Radar
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
