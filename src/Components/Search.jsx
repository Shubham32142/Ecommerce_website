import { useDispatch, useSelector } from "react-redux";
import { setSearchInput } from "./cartSlice";
import { Link } from "react-router-dom";
import "./Search.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

function Search() {
  const dispatch = useDispatch();
  const searchInput = useSelector((state) => state.cart.searchInput);
  const [showInput, setShowInput] = useState(false);

  const searchIcon = (
    <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
  );

  const cartIcon = <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>;

  // Toggle search input visibility
  function handleSearchClick() {
    setShowInput((prev) => !prev);
  }

  // Update search input in Redux store
  const handleInputChange = (e) => {
    dispatch(setSearchInput(e.target.value));
  };

  return (
    <>
      <ul className="user-actions">
        {showInput && (
          <input
            type="text"
            value={searchInput}
            placeholder="Search for products..."
            className="search-input"
            onChange={handleInputChange}
          />
        )}
        <li onClick={handleSearchClick}>{searchIcon}</li>

        <li>
          <Link to="/cart" id="cart">
            {cartIcon}{" "}
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Search;
