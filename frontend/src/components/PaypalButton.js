import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";

function PaypalButton(props) {
  const [sdkReady, setSdkReady] = useState(false);

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
    let mounted = true;
    const addPaypalSdk = async () => {
      const result = await axios.get("/api/config/paypal");
      const clientID = result.data;
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://www.paypal.com/sdk/js?&client-id=" +
        clientID +
        "&currency=GBP";
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      return script;
    };

    if (!window.paypal) {
      addPaypalSdk().then((scriptEl) => {
        if (mounted) {
          document.body.appendChild(scriptEl);
        }
      });
    } else {
      setSdkReady(true);
    }
    return () => {
      mounted = false;
    };
  }, []);

  if (!sdkReady) {
    return <div>Loading...</div>;
  }

  return (
    <PayPalButton
      {...props}
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
}

export default PaypalButton;
