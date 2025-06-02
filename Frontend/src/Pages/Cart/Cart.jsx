import Payment from "../../Components/Payment/Payment";

const handlePaymentSuccess = (order) => {
  // Clear cart and show success message
  dispatch(clearCart());
  toast({
    title: "Order Placed Successfully",
    description: `Order ID: ${order.orderId}`,
    status: "success",
    duration: 5000,
    isClosable: true,
  });
  navigate("/orders");
};

const handlePaymentFailure = () => {
  toast({
    title: "Payment Failed",
    description: "Please try again",
    status: "error",
    duration: 3000,
    isClosable: true,
  });
};

<Payment
  amount={totalAmount}
  items={cartItems}
  shippingAddress={{
    name: "Customer Name", // Replace with actual user data
    email: "customer@example.com", // Replace with actual user data
    phone: "9999999999", // Replace with actual user data
    address: "Shipping Address", // Replace with actual user data
    city: "City",
    state: "State",
    pincode: "PIN Code"
  }}
  onSuccess={handlePaymentSuccess}
  onFailure={handlePaymentFailure}
/> 