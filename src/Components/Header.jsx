import "./Header.css";
import Search from "./Search";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="container">
      <div className="overlay"></div>
      <nav className="nav-items">
        <ul className="nav-list">
          <li>
            <a href="#">Home</a>
          </li>

          <li>
            <Link to="/aboutus">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <ul className="brand">
          <li>Shoppy Globe</li>
        </ul>
        <Search />
      </nav>
      <div className="Sometext">
        <h2>casual & everyday</h2>
        <h1>Effortlesly Blend comfort & Style</h1>
        <p>
          Effortlessly blend comfort and style with our Casual & Everyday
          collection, featuring cozy sweaters, versatile denim, laid-back tees,
          and relaxed-fit joggers for your everyday adventures
        </p>
        <a href="#products" className="btn">
          View Collection
        </a>
      </div>
    </div>
  );
}

export default Header;
