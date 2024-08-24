import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = ({ links }) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/products"> PRODUCTS </NavLink>
      </li>
      <li>
        <NavLink to="/cart"> CART</NavLink>
      </li>
      <li>
        <NavLink to="/login"> AUTHENTICATE </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
