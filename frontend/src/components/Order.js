import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderDetails, payOrder } from "../redux/actions/orderActions";
import CheckoutProduct from "./CheckoutProduct";
import CheckoutSteps from "./CheckoutSteps";
import PaypalButton from "./PaypalButton";

function Order(props) {
  const { loading, success, error, order } = useSelector(
    (state) => state.orderCreate
  );
  const orderPay = useSelector(state => state.orderPay)
  const {loading: loadingPay, success: successPay, error: errorPay} = orderPay
  const dispatch = useDispatch();

  const handleSuccessPayment = (paymentResult) => {
      dispatch(payOrder(order, paymentResult))
  };

  useEffect(() => {
      if (successPay) {
          props.history.push("/profile")
      }
    dispatch(orderDetails(props.match.params.id));
  }, [successPay]);

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
              {order.data.shipping.address}, {order.data.shipping.city},
              {order.data.shipping.postcode}, {order.data.shipping.country}
            </div>
            <div>
              {order.isDelivered
                ? `Delivered at ${order.deliveredAt}`
                : `Not Delivered`}
            </div>
          </div>
          <div className="placeorder__payment">
            <h3>Payment</h3>
            <div>Payment method: {order.data.payment.paymentMethod}</div>
            <div>
              {order.data.isPaid ? `Paid at ${order.data.paidAt}` : `Not Paid`}
            </div>
          </div>
          <div className="placeorder__products">
            <h3>Shopping Basket</h3>
            {order.data.orderItems.length > 0 ? (
              order.data.orderItems.map((item) => (
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
              {!order.data.isPaid && (
                <PaypalButton
                  amount={order.data.totalPrice}
                  onSuccess={handleSuccessPayment}
                />
              )}
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items:</div>
              <div>£{order.data.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping:</div>
              <div>£{order.data.shippingPrice}</div>
            </li>
            <li>
              <div>Total:</div>
              <div>£{order.data.totalPrice}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Order;
