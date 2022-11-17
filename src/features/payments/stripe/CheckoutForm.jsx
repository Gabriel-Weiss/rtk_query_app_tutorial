import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../redux/cart/cartSlice";
import CircularProgress from "@mui/material/CircularProgress";

const CheckoutForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      // confirmParams: {
      //   return_url: `${window.location.origin}`,
      // },
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      toast.success(
        `Transferul a fost efectuat cu success.\nSuma : ${
          paymentIntent.amount / 100
        } lei`
      );
      dispatch(clearCart());
      navigate("/");
    } else {
      toast.error("Something went wrong!!!");
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        sx={{ mt: "30px" }}
        fullWidth
        size="large"
        color="secondary"
        variant="contained"
        disabled={!stripe || !elements || isProcessing}
        aria-label="Make payment button"
        data-testid="PayButton"
        type="submit"
      >
        {isProcessing ? (
          <CircularProgress size={25} color="secondary" />
        ) : (
          "Achita"
        )}
      </Button>
    </form>
  );
};

export default CheckoutForm;
