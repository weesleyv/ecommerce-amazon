import React from "react";
import {useDispatch} from 'react-redux';
import {removeFromBasket} from '../redux/actions/basketActions'
import "./CheckoutProduct.css";

function CheckoutProduct({ title, price, rating, image, id, qty }) {
  const dispatch = useDispatch()
  const remove = () => {
    dispatch(removeFromBasket(id))
  }
  const total = price * qty
  return (
    <div className="checkoutProduct">
      <img src={image} alt="productImg" className="checkoutProduct__image" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <strong>£{price}</strong>
          <small>Qty: {qty}</small>
          <small>Total: <strong>£{total.toFixed(2)}</strong></small>
        </p>

        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>
                <span role="img" aria-label="star">
                  &#11088;
                </span>
              </p>
            ))}
        </div>

        <button onClick={remove}>Remove from basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
