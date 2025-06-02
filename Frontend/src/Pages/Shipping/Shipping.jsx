import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { AuthContext } from "../../ContextApi/AuthContext";
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
  useToast,
  Container
} from "@chakra-ui/react";
import { API_URL } from "../../config";
import "../../App.css";
import { handleAuthRedirect } from '../../utils/auth';
import CartItem from "../Cart/CartItem";

function Shipping() {
  const navigate = useNavigate();
  const toast = useToast();
  const { authData, isAuth, setAuthData, setisAuth } = useContext(AuthContext);

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
    const token = localStorage.getItem('token');
    if (!token) {
      handleAuthRedirect(navigate, 'Please sign in to continue with shipping');
    }
  }, [navigate]);

  useEffect(() => {
    // Load cart items from localStorage
    const loadCartItems = () => {
      try {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
          const parsedCart = JSON.parse(cartData);
          if (Array.isArray(parsedCart) && parsedCart.length > 0) {
            setCartItems(parsedCart);
          } else {
            setCartItems([]);
          }
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems([]);
      }
    };

    loadCartItems();
  }, []);

  // Load user data from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setAuthData([parsedUserData]);
        setisAuth(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, [setAuthData, setisAuth]);

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

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);

      // Check if cart is empty
      if (!cartItems || cartItems.length === 0) {
        toast({
          title: "Error",
          description: "Your cart is empty. Please add items before placing an order.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom"
        });
        return;
      }

      // Get user data from localStorage as fallback
      const storedUserData = localStorage.getItem('user');
      let user;
      
      if (authData && authData.length > 0) {
        user = authData[0];
      } else if (storedUserData) {
        try {
          user = JSON.parse(storedUserData);
          setAuthData([user]);
          setisAuth(true);
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }

      if (!user || !user.id) {
        toast({
          title: "Error",
          description: "Please login to place an order",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom"
        });
        return;
      }

      // Validate shipping form data
      if (!userData.first_name || !userData.last_name || !userData.phone || 
          !userData.email || !userData.address || !userData.pincode || 
          !userData.city || !userData.state || !userData.country) {
        toast({
          title: "Error",
          description: "Please fill in all shipping details",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom"
        });
        return;
      }

      // Store shipping address in localStorage
      const shippingData = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        phone: userData.phone,
        email: userData.email,
        address: userData.address,
        pincode: userData.pincode,
        city: userData.city,
        state: userData.state,
        country: userData.country
      };

      localStorage.setItem('shippingAddress', JSON.stringify(shippingData));

      // Navigate to payment page
      navigate("/payment");
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
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
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Box 
        as="main" 
        pt="140px"
        minH="calc(100vh - 140px)"
      >
        <Container maxW="container.xl" py={8}>
          <Grid
            templateColumns={{
              base: "repeat(1,1fr)",
              lg: "repeat(1,1fr)",
              xl: "65% 30%"
            }}
            gap={8}
            justifyContent="space-between"
          >
            <GridItem>
              <Box bg="white" p={6} borderRadius="lg" boxShadow="lg">
                <Text
                  bg="teal.400"
                  p={2}
                  fontWeight="bold"
                  color="whiteAlpha.900"
                  fontSize="22px"
                  borderRadius="md"
                >
                  Shipping Address
                </Text>

                <Box mt={7}>
                  <Grid
                    templateColumns={{
                      base: "repeat(1,1fr)",
                      sm: "repeat(1,1fr)",
                      md: "repeat(2,1fr)",
                      lg: "repeat(2,1fr)"
                    }}
                    gap={4}
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
                      <Box pl={6} mt={-4}>
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
                      <Box pl={6} mt={-4}>
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
                    gap={4}
                    templateColumns={{
                      base: "repeat(1,1fr)",
                      sm: "repeat(1,1fr)",
                      md: "repeat(2,1fr)",
                      lg: "repeat(2,1fr)"
                    }}
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
                      <Box pl={6} mt={-4}>
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
                      <Box pl={6} mt={-4}>
                        {userData.email.includes("@") &&
                        userData.email.includes(".com")
                          ? ""
                          : mail}
                      </Box>
                    </Box>
                  </Grid>

                  <Grid
                    gap={4}
                    templateColumns={{
                      base: "repeat(1,1fr)",
                      sm: "repeat(1,1fr)",
                      md: "repeat(2,1fr)",
                      lg: "repeat(2,1fr)"
                    }}
                    mt={4}
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
                      <Box pl={6} mt={-4}>
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
                    </Box>
                  </Grid>

                  <Grid
                    gap={4}
                    templateColumns={{
                      base: "repeat(1,1fr)",
                      sm: "repeat(1,1fr)",
                      md: "repeat(2,1fr)",
                      lg: "repeat(2,1fr)"
                    }}
                    mt={4}
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
                      <Box pl={6} mt={-4}>
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
                      <Box pl={6} mt={-4}>
                        {cities}
                      </Box>
                    </Box>
                  </Grid>

                  <Grid
                    gap={4}
                    templateColumns={{
                      base: "repeat(1,1fr)",
                      sm: "repeat(1,1fr)",
                      md: "repeat(2,1fr)",
                      lg: "repeat(2,1fr)"
                    }}
                    mt={4}
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
                      <Box pl={6} mt={-4}>
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
                      <Box pl={6} mt={-4}>
                        {statess}
                      </Box>
                    </Box>
                  </Grid>

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
                    mt={6}
                    isLoading={loading}
                    loadingText="Placing Order..."
                    disabled={!isFormValid || loading}
                    _hover={{
                      bg: isFormValid ? "#00a9b6" : "#cccccc",
                      transform: "translateY(-2px)",
                      boxShadow: "lg"
                    }}
                    transition="all 0.3s ease"
                  >
                    CONTINUE
                  </Button>
                </Box>
              </Box>
            </GridItem>

            <GridItem>
              <CartItem />
            </GridItem>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default Shipping;