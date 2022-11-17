import Box from "@mui/material/Box";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const StripeContainer = (amount) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#9c27b0",
    },
  };
  const options = { clientSecret, appearance };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/stripe/config`).then(
      async (res) => {
        const { publishableKey } = await res.json();
        setStripePromise(loadStripe(publishableKey));
      }
    );
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/stripe/payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(amount),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  return (
    <Box alignSelf="center" mt={2}>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </Box>
  );
};

export default StripeContainer;
