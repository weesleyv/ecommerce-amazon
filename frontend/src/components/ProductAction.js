import React, { useState } from "react";
import "./ProductAction.css";
import { addToBasket } from "../redux/actions/basketActions";
import { useDispatch, useSelector } from "react-redux";

function ProductAction({ product }) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch()
  const add =  () => dispatch(addToBasket(product, qty))
  return (
    <div className="productaction">
      <p className="product__price">
        Price:
        <small> £</small>
        <strong>{product.price}</strong>
      </p>
      <p>Status:</p>
      <p>
        Qty:{" "}
        <select value={qty} onChange={(e) => setQty(e.target.value)}>
          {Array(product.countInStock)
            .fill()
            .map((item, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
        </select>
      </p>
      <button onClick={add}>Add to Basket</button>
    </div>
  );
}

export default ProductAction;
