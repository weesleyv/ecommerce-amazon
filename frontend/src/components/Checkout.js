import React from "react";
import { useSelector } from "react-redux";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";

function Checkout() {
  const  {basketItems}  = useSelector((state) => state.basket);
 
  return (
    <div className="checkout">
      <div className="checkout__left">
        {basketItems?.length === 0 ? (
          <div>
            <h1>Your Shopping basket is empty</h1>
            <p>
              The price and availability of items at Amazon.com are subject to
              change. The Cart is a temporary place to store a list of your
              items and reflects each item's most recent price. Shopping Cart.
              Do you have a gift card or promotional code? We'll ask you to
              enter your claim code when it's time to pay.
            </p>
          </div>
        ) : (
          <div>
            <h1 className="checkout__title">Yor Shopping basket</h1>
            {basketItems.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                qty={item.qty}
              />
            ))}
          </div>
        )}
      </div>
      {basketItems.length > 0 && (
        <div className="checkout__right">
          <Subtotal />
        </div>
      )}
    </div>
  );
}

export default Checkout;
