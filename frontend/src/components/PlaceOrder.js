import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckoutProduct from "./CheckoutProduct";
import CheckoutSteps from "./CheckoutSteps";
import "./PlaceOrder.css";
import { basketTotal } from "../redux/reducers/basketReducers";
import {createOrder} from "../redux/actions/orderActions";
import { orderCreateReducer } from "../redux/reducers/orderReducers";

function PlaceOrder(props) {
  const basket = useSelector((state) => state.basket);
  const dispatch = useDispatch()
  const {loading, success, error, order} = useSelector(state => state.orderCreate)
  const { basketItems, shipping, payment } = basket;

  const itemsPrice = parseFloat(basketTotal(basketItems)).toFixed(2);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = itemsPrice + shippingPrice;

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: basketItems,
        shipping,
        payment: {paymentMethod: payment},
        itemsPrice,
        shippingPrice,
        totalPrice,
      })
    );
  };

  if (!shipping.address) {
    props.history.push("shipping");
  } else if (!payment) {
    props.history.push("payment");
  }

  useEffect(() => {
    if (success) {
      console.log(order)
      props.history.push("/orders/" + order.data._id)
    }
  }, [success])

  return (
    loading ? <div>Loading...</div>
      : error ? <div>{error}</div> :
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="placeorder">
        <div className="placeorder__info">
          <div className="placeorder__shipping">
            <h3>Shipping</h3>
            <div>
              {shipping.address}, {shipping.city},
              {shipping.postcode}, {shipping.country}
            </div>
          </div>
          <div className="placeorder__payment">
            <h3>Payment</h3>
            <div>Payment method: {basket.payment}</div>
          </div>
          <div className="placeorder__products">
            <h3>Shopping Basket</h3>
            {basketItems.length > 0 ? (
              basketItems.map((item) => (
                <CheckoutProduct
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                  qty={item.qty}
                />
              ))
            ) : (
              <p>Basket is empty</p>
            )}
          </div>
        </div>
        <div className="placeorder__action">
          <ul>
            <li className="placeorder__paypalBtn">
              <button className="placeorderBtn" onClick={placeOrderHandler}>
                Place Order
              </button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items:</div>
              <div>£{itemsPrice}</div>
            </li>
            <li>
              <div>Shipping:</div>
              <div>£{shippingPrice}</div>
            </li>
            <li>
              <div>Total:</div>
              <div>£{totalPrice}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
