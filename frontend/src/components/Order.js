import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderDetailsAction, payOrder } from "../redux/actions/orderActions";
import CheckoutProduct from "./CheckoutProduct";
import CheckoutSteps from "./CheckoutSteps";
import PaypalButton from "./PaypalButton";
import * as orderActions from "../redux/actionTypes/orderConsts";

function Order(props) {
  const orderDetails = useSelector(
    (state) => state.orderDetails
  );
  const {loading, error, order} = orderDetails
  const orderPay = useSelector(state => state.orderPay)
  const {loading: loadingPay, success: successPay, error: errorPay} = orderPay
  
  const dispatch = useDispatch();

  const handleSuccessPayment = (paymentResult) => {
      dispatch(payOrder(order, paymentResult))
  };

  useEffect(() => {
      if (successPay) {
          props.history.push("/profile")
          dispatch({type: orderActions.ORDER_PAY_RESET})
      } else {
        dispatch(orderDetailsAction(props.match.params.id));
      }
      return () => {
          //
      };
  }, [successPay, props, dispatch]);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="placeorder">
        <div className="placeorder__info">
          <div className="placeorder__shipping">
            <h3>Shipping</h3>
            <div>
              {order.shipping.address}, {order.shipping.city},
              {order.shipping.postcode}, {order.shipping.country}
            </div>
            <div>
              {order.isDelivered
                ? `Delivered at ${order.deliveredAt}`
                : `Not Delivered`}
            </div>
          </div>
          <div className="placeorder__payment">
            <h3>Payment</h3>
            <div>Payment method: {order.payment.paymentMethod}</div>
            <div>
              {order.isPaid ? `Paid at ${order.paidAt}` : `Not Paid`}
            </div>
          </div>
          <div className="placeorder__products">
            <h3>Shopping Basket</h3>
            {order.orderItems.length > 0 ? (
              order.orderItems.map((item) => (
                <CheckoutProduct
                  key={item._id}
                  id={item._id}
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
              {loadingPay && <div>Processing Payment...</div>}
              {errorPay && <div>{errorPay}</div>}
              {!order.isPaid && 
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment}
                />
              }
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items:</div>
              <div>£{order.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping:</div>
              <div>£{order.shippingPrice}</div>
            </li>
            <li>
              <div>Total:</div>
              <div>£{order.totalPrice}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Order;
