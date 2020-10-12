import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProducts,
  saveProduct,
  deleteProduct,
} from "../redux/actions/productActions";
import "./CreateProduct.css";

function CreateProduct() {
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");

  const { loading, products, error } = useSelector(
    (state) => state.productList
  );

  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = useSelector((state) => state.productSave);

  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = useSelector((state) => state.productDelete);

  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModal(false);
    }
    dispatch(listProducts());
  }, [successSave, successDelete]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        description,
        brand,
        category,
        countInStock,
      })
    );
  };

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product));
  };

  const openModal = (product) => {
    setModal(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setDescription(product.description);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  };

  return (
    <div className="createProduct__content">
      {!modal && (
        <div className="createProduct__header">
          <h2>Products</h2>
          <button onClick={() => openModal({})}>Create Product</button>
        </div>
      )}
      {modal && (
        <div className="createProduct">
          <div className="createProduct__container">
            <h1>Create Product</h1>
            {loadingSave && <p>Loading...</p>}
            {errorSave && <p>{errorSave}</p>}
            <form onSubmit={submitHandler}>
              <h5>Product name</h5>
              <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <h5>Product price</h5>
              <input
                type="text"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
              <h5>Image</h5>
              <input
                type="text"
                name="image"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
              <h5>Brand</h5>
              <input
                type="text"
                name="brand"
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
              />
              <h5>Category</h5>
              <input
                type="text"
                name="category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              />
              <h5>Count in Stock</h5>
              <input
                type="text"
                name="count"
                onChange={(e) => setCountInStock(e.target.value)}
                value={countInStock}
              />
              <h5>Description</h5>
              <textarea
                rows="5"
                name="description"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
              <button type="submit" className="createProduct__createButton">
                {id ? "Update" : "Create New Product"}
              </button>
              <button
                className="createProduct__backButton"
                onClick={() => setModal(false)}
              >
                Back
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="createProduct__productList">
        <table className="createProduct__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td data-label="ID">{product._id}</td>
                <td data-label="Name">{product.name}</td>
                <td data-label="Price">{product.price}</td>
                <td data-label="Category">{product.category}</td>
                <td data-label="Brand">{product.brand}</td>
                <td data-label="Action">
                  <button
                    onClick={() => openModal(product)}
                    className="createProduct__productButton"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteHandler(product)}
                    className="createProduct__productButton"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CreateProduct;
