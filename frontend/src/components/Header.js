import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { itemsInBasket } from "../redux/reducers/basketReducers";

//icons
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

function Header() {
  const { basketItems } = useSelector((state) => state.basket);
  const [open, setOpen] = useState(false);
  const openMenu = () => {
    setOpen(!open);
  };
  return (
    <nav className="header">
      <button className="header__menubutton" onClick={openMenu}>
        &#9776;
      </button>
      <Link to="/">
        <img
          src="https://completemusicupdate.com/wp-content/uploads/2016/05/amazon1250.jpg"
          alt="logo"
          className="header__logo"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link className="header__link" to="/login">
          <div className="header__option">
            <span className="header__optionLineOne">Hello Vitalij</span>
            <span className="header__optionLineTwo">Sign In</span>
          </div>
        </Link>
        <Link className="header__link" to="/smt">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        <Link className="header__link" to="smt">
          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Prime</span>
          </div>
        </Link>

        <Link className="header__link" to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {itemsInBasket(basketItems)}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
