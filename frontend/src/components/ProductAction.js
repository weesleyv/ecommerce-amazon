import React from "react";
import "./ProductAction.css";

function ProductAction({ price }) {
  return (
    <div className="productaction">
      <p className="product__price">
        Price:
        <small> £</small>
        <strong>{price}</strong>
      </p>
      <p>Status:</p>
      <p>
        Qty:{" "}
        <select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </p>
      <button>Add to Basket</button>
    </div>
  );
}

export default ProductAction;
