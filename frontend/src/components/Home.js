import React from "react";
import "./Home.css";
import Product from "./Product";
import data from "../data";

function Home() {
  return (
    <div className="home">
      <img
        className="home__image"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/gateway/placement/launch/All_Or_Nothing_Tottenham_Hotspur_S1/AONT_S1_GWBleedingHero_FT_COVIDUPDATE_XSite_1500X600_PV_en-GB._CB406302419_.jpg"
        alt="background"
      />
      <div className="home__row">
        {data.products.map((product) => (
          <Product
            id={product.id}
            title={product.title}
            price={product.price}
            rating={product.rating}
            image={product.image}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
