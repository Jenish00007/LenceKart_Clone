import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import {
  Box,
  Text,
  Grid,
  GridItem,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Flex,
  useToast
} from "@chakra-ui/react";
import { API_URL } from "../../config";
import "../../App.css";

function Shipping() {
  const navigate = useNavigate();
  const toast = useToast();

  const init = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    pincode: "",
    city: "",
    country: "India",
    state: ""
  };

  const [userData, setUserData] = useState(init);
  const [first, setFirst] = useState();
  const [last, setLast] = useState();
  const [ph, setPh] = useState();
  const [gender, setGender] = useState("Male");
  const [mail, setMail] = useState();
  const [add, setAdd] = useState();
  const [pin, setPin] = useState();
  const [cities, setCities] = useState();
  const [countries, setCountries] = useState();
  const [statess, setStatess] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch cart items from localStorage or your cart management system
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  const Required = (props) => {
    return (
      <Box
        fontSize={"14px"}
        m="3px 0px 3px 0px"
        color={"#ff1f1f"}
        fontWeight="500"
        letterSpacing={"-0.4px"}
      >
        {props.info}
      </Box>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    switch (name) {
      case "first_name":
        setFirst(
          value === "" ? <Required info="This is a required feild" /> : ""
        );
        break;

      case "last_name":
        setLast(
          value === "" ? <Required info="This is a required feild" /> : ""
        );
        break;

      case "phone":
        setPh(
          value === "" ? (
            <Required info="This is a required feild" />
          ) : (
            <Required info="Please enter a valid mobile number (eg. 9987XXXXXX)" />
          )
        );
        break;

      case "email":
        setMail(
          value === "" ? (
            <Required info="This is a required feild" />
          ) : (
            <Required info="Please enter a valid email address e.g. johndoe@domain.com." />
          )
        );
        break;

      case "address":
        setAdd(
          value === "" ? <Required info="This is a required feild" /> : ""
        );
        break;

      case "pincode":
        setPin(
          value === "" ? (
            <Required info="This is a required feild" />
          ) : (
            <Required info="Pincode should be 6 digit (eg. 110001)" />
          )
        );
        break;

      case "city":
        setCities(
          value === "" ? <Required info="This is a required feild" /> : ""
        );
        break;

      case "country":
        setCountries(
          value === "" ? <Required info="This is a required feild" /> : ""
        );
        break;

      case "state":
        setStatess(
          value === "" ? <Required info="This is a required feild" /> : ""
        );
        break;

      default:
        break;
    }
  };

  const calculateOrderDetails = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.18; // 18% tax
    const total = subtotal + tax;

    return {
      items: cartItems.map(item => ({
        id: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.imageTsrc
      })),
      subtotal,
      tax,
      coupon: 0,
      total
    };
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);

      const orderDetails = calculateOrderDetails();
      const userId = localStorage.getItem('userId'); // Get userId from your auth system

      const orderData = {
        userId,
        amount: orderDetails.total,
        orderDetails,
        shippingAddress: userData
      };

      const response = await fetch(`${API_URL}/api/orders/place-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add your auth token if required
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Order Placed Successfully",
          description: "Your order has been placed successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom"
        });
        
        // Clear cart after successful order
        localStorage.removeItem('cart');
        
        // Navigate to order confirmation or checkout page
        navigate("/checkout", { state: { orderId: data.order.orderId } });
      } else {
        throw new Error(data.message || 'Failed to place order');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to place order",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = 
    userData.first_name.length >= 1 &&
    userData.last_name.length >= 1 &&
    userData.phone.length === 10 &&
    userData.email.includes("@") &&
    userData.email.includes(".com") &&
    userData.address.length >= 1 &&
    userData.pincode.length === 6 &&
    userData.city.length >= 1 &&
    userData.country.length >= 1 &&
    userData.state.length >= 1;

  return (
    <>
      <Navbar />
      <br />
      <br />
      <Grid
        m="auto"
        templateColumns={{
          base: "repeat(1,1fr)",
          lg: "repeat(1,1fr)",
          xl: "65% 30%"
        }}
        justifyContent="space-around"
        w="100%"
      >
        <GridItem w={{ xl: "90%", lg: "80%", md: "80%", base: "80%" }} m="auto">
          <Box id="addres">
            <Text
              id="ships"
              bg="teal.400"
              p="2"
              fontWeight="bold"
              color="whiteAlpha.900"
              fontSize="22px"
            >
              Shipping Address
            </Text>

            <Box border="1px solid black" p="4" borderRadius="xl" mt="7">
              <Grid
                templateColumns={{
                  base: "repeat(1,1fr)",
                  sm: "repeat(1,1fr)",
                  md: "repeat(2,1fr)",
                  lg: "repeat(2,1fr)"
                }}
                w="100%"
                gap={{ sm: "4", base: "4" }}
              >
                <Box>
                  <input
                    type="text"
                    name="first_name"
                    fontSize="16px"
                    onChange={handleChange}
                    placeholder="First Name*"
                    className="input"
                  />
                  <Box pl="6" mt="-4">
                    {first}
                  </Box>
                </Box>
                <Box>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name*"
                    className="input"
                    fontSize="16px"
                    onChange={handleChange}
                  />
                  <Box pl="6" mt="-4">
                    {last}
                  </Box>
                </Box>
              </Grid>

              <Flex
                fontSize="15px"
                p="10px"
                m="10px 0px 0px 22px"
                gap={{ lg: "4", sm: "1", base: "1" }}
              >
                <Text>Gender</Text>
                <RadioGroup onChange={setGender} value={gender} name={gender}>
                  <Stack direction="row" gap={{ lg: "2", sm: "1", base: "1" }}>
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                  </Stack>
                </RadioGroup>
              </Flex>

              <Grid
                gap={{ sm: "4", base: "4" }}
                templateColumns={{
                  base: "repeat(1,1fr)",
                  sm: "repeat(1,1fr)",
                  md: "repeat(2,1fr)",
                  lg: "repeat(2,1fr)"
                }}
                w="100%"
              >
                <Box>
                  <input
                    className="input"
                    type="number"
                    name="phone"
                    placeholder="Phone Number*"
                    borderRadius="20px"
                    fontSize="16px"
                    onChange={handleChange}
                  />
                  <Box pl="6" mt="-4">
                    {userData.phone.length === 10 ? "" : ph}
                  </Box>
                </Box>

                <Box>
                  <input
                    className="input"
                    type="email"
                    name="email"
                    placeholder="Email*"
                    fontSize="16px"
                    onChange={handleChange}
                  />
                  <Box pl="6" mt="-4">
                    {userData.email.includes("@") &&
                    userData.email.includes(".com")
                      ? ""
                      : mail}
                  </Box>
                </Box>
              </Grid>
              <br />

              <Grid
                gap={{ sm: "4", base: "4" }}
                templateColumns={{
                  base: "repeat(1,1fr)",
                  sm: "repeat(1,1fr)",
                  md: "repeat(2,1fr)",
                  lg: "repeat(2,1fr)"
                }}
                w="100%"
              >
                <Box>
                  <input
                    className="input"
                    type="text"
                    name="address"
                    placeholder="Address Line 1*"
                    fontSize="16px"
                    onChange={handleChange}
                  />
                  <Box pl="6" mt="-4">
                    {add}
                  </Box>
                </Box>
                <Box>
                  <input
                    className="input"
                    type="text"
                    placeholder="Address Line 2"
                    fontSize="16px"
                  />
                  <br />
                </Box>
              </Grid>

              <Grid
                gap={{ sm: "4", base: "4" }}
                templateColumns={{
                  base: "repeat(1,1fr)",
                  sm: "repeat(1,1fr)",
                  md: "repeat(2,1fr)",
                  lg: "repeat(2,1fr)"
                }}
                w="100%"
              >
                <Box>
                  <input
                    className="input"
                    type="text"
                    name="pincode"
                    placeholder="Zip/Postal Code*"
                    fontSize="16px"
                    onChange={handleChange}
                  />
                  <Box pl="6" mt="-4">
                    {userData.pincode.length === 6 ? "" : pin}
                  </Box>
                </Box>
                <Box>
                  <input
                    className="input"
                    type="text"
                    placeholder="City/District*"
                    name="city"
                    fontSize="16px"
                    onChange={handleChange}
                  />
                  <Box pl="6" mt="-4">
                    {cities}
                  </Box>
                </Box>
              </Grid>

              <br />

              <Grid
                gap={{ sm: "4", base: "4" }}
                templateColumns={{
                  base: "repeat(1,1fr)",
                  sm: "repeat(1,1fr)",
                  md: "repeat(2,1fr)",
                  lg: "repeat(2,1fr)"
                }}
                w="100%"
              >
                <Box>
                  <input
                    className="input"
                    type="text"
                    placeholder="Country*"
                    name="country"
                    fontSize="16px"
                    onChange={handleChange}
                  />
                  <Box pl="6" mt="-4">
                    {countries}
                  </Box>
                </Box>
                <Box>
                  <input
                    className="input"
                    type="text"
                    placeholder="State*"
                    name="state"
                    fontSize="16px"
                    onChange={handleChange}
                  />
                  <Box pl="6" mt="-4">
                    {statess}
                  </Box>
                </Box>
              </Grid>
              <br />

              <Button
                onClick={isFormValid ? handlePlaceOrder : undefined}
                bg={isFormValid ? "#00b9c6" : "#cccccc"}
                p="25px 20px"
                color="#fff"
                textAlign="center"
                fontWeight="bold"
                borderRadius="5px"
                fontSize="18px"
                ml={{ lg: "80%", sm: "70%", base: "50%" }}
                isLoading={loading}
                loadingText="Placing Order..."
                disabled={!isFormValid || loading}
              >
                CONTINUE
              </Button>
            </Box>
            <br />
          </Box>
        </GridItem>
        <GridItem w={{ xl: "90%", lg: "80%", md: "80%", base: "80%" }} m="auto">
          <CartItem />
        </GridItem>
      </Grid>
      <br />
      <br />
      <Footer />
    </>
  );
}

export default Shipping;
