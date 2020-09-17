import React from "react";
import "./CheckoutProduct.css";
import {useStateValue} from '../StateProvider'

function CheckoutProduct({ title, price, rating, image, id }) {
    const [, dispatch] = useStateValue()
  const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id
        })
  };
  return (
    <div className="checkoutProduct">
      <img src={image} alt="productImg" className="checkoutProduct__image" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>£</small>
          <strong>{price}</strong>
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

        <button onClick={removeFromBasket}>Remove from basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
