import React from "react";
import "./ProductDetail.css";
import data from "../data";
import NotFound from "./NotFound";
import ProductAction from "./ProductAction";

function ProductDetail({ match }) {
  const id = Number(match.params.id);
  const product = data.products.find((product) => product.id === id);

  return (
    <div className="productdetail__wrapper">
      {product ? (
        <div className="productdetail">
          <div className="productdetail__image">
            <img src={product.image} alt="productImg" />
          </div>
          <div className="productdetail__info">
            <h4>{product.title}</h4>
            <p className="product__price">
              Price:
              <small> £</small>
              <strong>{product.price}</strong>
            </p>
            <p>{product.rating} Stars </p>
            <div className="description">
              <p>{product.description}</p>
            </div>
          </div>
          <ProductAction price={product.price}/>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default ProductDetail;
