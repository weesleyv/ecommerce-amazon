import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../redux/actions/productActions";
import "./Home.css";
import Product from "./Product";

function Home() {
  const productList = useSelector(state => state.productList)
  const {products, loading, error } = productList
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    loading ? <h1>loading...</h1> :
    error ? <h1>{error.message}</h1> :
    <div className="home">
      <img
        className="home__image"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/gateway/placement/launch/All_Or_Nothing_Tottenham_Hotspur_S1/AONT_S1_GWBleedingHero_FT_COVIDUPDATE_XSite_1500X600_PV_en-GB._CB406302419_.jpg"
        alt="background"
      />
      <div className="home__row">
        {products.map((product) => (
          <Product product={product} key={product._id}/>
        ))}
      </div>
    </div>
  );
}

export default Home;
