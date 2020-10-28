import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import { addToBasket } from "../redux/actions/basketActions";
import { useDispatch } from "react-redux";

function Product({ product }) {
  const [qty] = useState(1);
  const dispatch = useDispatch()
  const add =  () => dispatch(addToBasket(product, qty))

  return (
    <div className="product">
      <div className="product__info">
        <p>{product.name}</p>
        <p className="product__price">
          <small>£</small>
          <strong>{product.price}</strong>
        </p>
        <div className="product__rating">
          {Array(product.rating)
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
      <Link to={`/product/${product._id}`} className="product__link" >
        <img src={product.image} alt="productImg" />
      </Link>
      <button onClick={add}>Add to basket</button>
    </div>
  );
}

export default Product;
