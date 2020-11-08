import React, { useState, useRef } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { itemsInBasket } from "../redux/reducers/basketReducers";

//icons
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { listProducts } from "../redux/actions/productActions";

function Header() {
  const { userInfo } = useSelector((state) => state.userSignin);
  const { basketItems } = useSelector((state) => state.basket);
  const dispatch = useDispatch()
  const input = useRef()
  const [open, setOpen] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(listProducts(input.current.value))
  }
  const openMenu = () => {
    setOpen(!open);
  };
  return (
    <nav className="header">
      <button className="header__menubutton" onClick={openMenu}>
        &#9776;
      </button>
      <Link to="/" className="header__logoLink">
        <img
          src="https://completemusicupdate.com/wp-content/uploads/2016/05/amazon1250.jpg"
          alt="logo"
          className="header__logo"
        />
      </Link>

      <div className="header__search">
        <form className="header__search" onSubmit={handleSubmit}>
          <input className="header__searchInput" ref={input} />
          <button type="submit" className="header__searchButton"><SearchIcon className="header__searchIcon" /></button>
        </form>
      </div>

      <div className="header__nav">
        <Link className="header__link" to="/signin">
          <div className="header__option">
            <span className="header__optionLineOne">
              Hello, {userInfo?.name}
            </span>
            <span className="header__optionLineTwo">Sign In</span>
          </div>
        </Link>
        {userInfo && userInfo.isAdmin ? (
          <div className="header__dropdown">
            <div className="header__option">Admin</div>
            <ul className="header__dropdown-content">
              <li>
                <Link to="/adminorders" className="header__dropdown-link">
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/newproduct" className="header__dropdown-link">
                  Products
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link className="header__link" to="/smt">
            <div className="header__option">
              <span className="header__optionLineOne">Returns</span>
              <span className="header__optionLineTwo">& Orders</span>
            </div>
          </Link>
        )}

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
