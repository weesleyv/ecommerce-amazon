import React from "react";
import { useSelector } from "react-redux";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import {basketTotal, itemsInBasket} from "../redux/reducers/basketReducers"

function Subtotal({checkout}) {
  const  {basketItems}  = useSelector((state) => state.basket);
 
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({itemsInBasket(basketItems)} items):{" "}
              <strong>{`${value} pounds`}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={basketTotal(basketItems)}
        displayType="text"
        thousandSeparator={true}
        prefix="£"
      />
      <button onClick={checkout}>Proceed to checkout</button>
    </div>
  );
}

export default Subtotal;
