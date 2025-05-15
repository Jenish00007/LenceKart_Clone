import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { API_URL } from "../../config";

const Payment = ({ amount, items, shippingAddress, onSuccess, onFailure }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const orderDetails = {
    amount,
    items,
    shippingAddress,
    timestamp: new Date().toISOString()
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    setLoading(true);
    try {
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      if (!res) {
        toast({
          title: "Razorpay SDK failed to load",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Create order
      const response = await fetch(`${API_URL}/api/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, orderDetails }),
      });

      const data = await response.json();

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "Lenskart",
        description: "Payment for your order",
        order_id: data.id,
        handler: async function (response) {
          try {
            const verifyResponse = await fetch(`${API_URL}/api/payment/verify-payment`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderDetails
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              toast({
                title: "Payment Successful",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
              onSuccess(verifyData.order);
            } else {
              toast({
                title: "Payment Verification Failed",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
              onFailure();
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            toast({
              title: "Payment Verification Failed",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            onFailure();
          }
        },
        prefill: {
          name: shippingAddress.name,
          email: shippingAddress.email,
          contact: shippingAddress.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error in payment process:", error);
      toast({
        title: "Payment Failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      onFailure();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Button
        isLoading={loading}
        loadingText="Processing..."
        colorScheme="blue"
        size="lg"
        onClick={displayRazorpay}
      >
        Pay ₹{amount}
      </Button>
    </Box>
  );
};

export default Payment; 