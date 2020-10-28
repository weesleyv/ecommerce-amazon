import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { createOrder } from "../redux/actions/orderActions";

function PaypalButton(props) {
  const [sdkReady, setSdkReady] = useState(false);
  const addPaypalSdk = async () => {
    const result = await axios.get("/api/config/paypal");
    const clientID = result.data;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://www.paypal.com/sdk/js?currency=GBP&client-id=" + clientID;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  const createOrder = (data, actions) =>
    actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "GBP",
            value: props.amount,
          },
        },
      ],
    });

  const onApprove = (data, actions) =>
    actions.order
      .capture()
      .then((details) => props.onSuccess(data, details))
      .catch((error) => console.log(error));

  useEffect(() => {
    if (!window.paypal) {
      addPaypalSdk();
    }
  }, []);

  if (!sdkReady) {
    return <div>Loading...</div>;
  }

  const Button = window.paypal.Buttons.driver("react", { React, ReactDOM });
  return (
    <Button
      {...props}
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
}

export default PaypalButton;
