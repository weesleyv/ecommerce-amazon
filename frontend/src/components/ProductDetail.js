import React, { useEffect } from "react";
import "./ProductDetail.css";
import { detailsProduct } from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import ProductAction from "./ProductAction";

function ProductDetail({ match }) {
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();
  const productId = match.params.id


  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="productdetail__wrapper">
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
          <ProductAction product={product} />
        </div>
    </div>
  );
}

export default ProductDetail;
