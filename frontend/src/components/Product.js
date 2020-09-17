import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import { useStateValue } from "../StateProvider";

function Product({ id, title, image, rating, price }) {
  const [, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        image,
        rating,
        price,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>£</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
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
      </div>
      <Link to={`/product/${id}`} className="product__link" >
        <img src={image} alt="productImg" />
      </Link>
      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
}

export default Product;
