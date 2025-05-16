import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../ContextApi/AuthContext";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Checkbox,
  useDisclosure,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Box,
  Heading,
  Input,
  HStack,
  Flex,
  Center,
  InputGroup,
  InputRightElement,
  useToast,
  Text
} from "@chakra-ui/react";
import { API_URL } from "../../config";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [btn, setbtn] = useState();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [pass, setpass] = useState(false);
  const [show, setShow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setisAuth, setAuthData, isAuth } = useContext(AuthContext);
  const [incorrect, setinCorrect] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  // Check for existing token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setisAuth(true);
      setAuthData([JSON.parse(user)]);
    } else if (token) {
      // fallback: fetch user profile if user data is not in localStorage
      fetch(`${API_URL}/user/profile`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(res => res.ok ? res.json() : null)
        .then(userData => {
          if (userData) {
            setisAuth(true);
            setAuthData([userData]);
            localStorage.setItem("user", JSON.stringify(userData));
          } else {
            localStorage.removeItem("token");
          }
        })
        .catch(() => localStorage.removeItem("token"));
    }
  }, [setisAuth, setAuthData]);

  // Show message from redirect if present
  useEffect(() => {
    if (location.state?.message) {
      toast({
        title: "Authentication Required",
        description: location.state.message,
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
    }
  }, [location.state, toast]);

  const handlechange = (e) => {
    setinCorrect(false);
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });

    if (name === "email" && !value.includes("@") && !value.includes(".com")) {
      const buton = (
        <Box
          fontSize={"14px"}
          mt="5px"
          color={"#ff1f1f"}
          fontWeight="500"
          letterSpacing={"-0.4px"}
        >
          Please enter a valid Email or Mobile Number.
        </Box>
      );
      setbtn(buton);
    } else {
      setbtn(null);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setinCorrect(false);

      if (!loginData.email || !loginData.password) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom"
        });
        return;
      }

      const response = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Save token
        localStorage.setItem("token", data.token);
        
        // Check if user data is included in the login response
        if (data.user) {
          // If user data is in the login response, use it directly
          setAuthData([data.user]);
          localStorage.setItem("user", JSON.stringify(data.user));
          setisAuth(true);
          
          toast({
            title: "Login Successful",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "bottom"
          });

          // Close modal and navigate based on user role or redirect path
          onClose();
          const redirectPath = localStorage.getItem('redirectPath');
          if (data.user.role === "admin") {
            navigate("/productlist");
          } else if (redirectPath) {
            localStorage.removeItem('redirectPath');
            navigate(redirectPath);
          } else {
            navigate("/");
          }
        } else {
          // If user data is not in login response, fetch it
          const userResponse = await fetch(`${API_URL}/user/profile`, {
            headers: {
              "Authorization": `Bearer ${data.token}`
            }
          });

          if (userResponse.ok) {
            const userData = await userResponse.json();
            setAuthData([userData]);
            localStorage.setItem("user", JSON.stringify(userData));
            setisAuth(true);
            
            toast({
              title: "Login Successful",
              status: "success",
              duration: 2000,
              isClosable: true,
              position: "bottom"
            });

            // Close modal and navigate based on user role or redirect path
            onClose();
            const redirectPath = localStorage.getItem('redirectPath');
            if (userData.role === "admin") {
              navigate("/productlist");
            } else if (redirectPath) {
              localStorage.removeItem('redirectPath');
              navigate(redirectPath);
            } else {
              navigate("/");
            }
          } else {
            throw new Error("Failed to fetch user profile");
          }
        }
      } else {
        throw new Error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setinCorrect(true);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    setLoginData(prev => ({ ...prev, password: "" }));
    setpass(false);
  };

  const handleSignIn = () => {
    if (loginData.password.length >= 6) {
      handleLogin();
    } else {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 6 characters long",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });
    }
  };

  return (
    <div>
      <Center onClick={onOpen} fontWeight={"400"} fontSize="15px" w="80px">
        Sign In
      </Center>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={{ xl: "md", lg: "md", md: "md", sm: "md", base: "sm" }}
      >
        <ModalOverlay />
        <ModalContent rounded="3xl">
          <ModalCloseButton
            borderRadius={"50%"}
            bg="white"
            m={"10px 10px 0px 0px"}
          />

          <ModalBody p={"0px 0px "} borderRadius={"15px 15px 15px 15px "}>
            <Image
              src="https://static1.lenskart.com/media/desktop/img/DesignStudioIcons/DesktopLoginImage.svg"
              alt="pic"
              borderRadius={"10px 10px 0px 0px "}
            />
            <Box m={"34px 45px 50px 45px"}>
              <Heading
                fontFamily={" Times, serif"}
                fontWeight="100"
                fontSize={"28px"}
                mb="24px"
                color={"#333368"}
              >
                Sign In
              </Heading>

              {location.state?.message && (
                <Text color="blue.500" mb={4} fontSize="sm">
                  {location.state.message}
                </Text>
              )}

              <Input
                name="email"
                value={loginData.email}
                onChange={handlechange}
                placeholder="Email or Mobile Number"
                size="lg"
                borderRadius={"35px/35px"}
                mb="15px"
                h="50px"
                fontSize="16px"
                _focus={{
                  borderColor: "#11daac",
                  boxShadow: "0 0 0 1px #11daac"
                }}
              />
              {btn}

              <InputGroup size="lg" mb="15px">
                <Input
                  name="password"
                  value={loginData.password}
                  onChange={handlechange}
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  borderRadius={"35px/35px"}
                  h="50px"
                  fontSize="16px"
                  _focus={{
                    borderColor: "#11daac",
                    boxShadow: "0 0 0 1px #11daac"
                  }}
                />
                <InputRightElement width="6.5rem" size="lg">
                  <Button
                    size="md"
                    borderRadius="3xl"
                    mt="20%"
                    onClick={() => setShow(!show)}
                    bg="white"
                  >
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Button
                isLoading={loading}
                onClick={pass ? handleSignIn : () => setpass(true)}
                bgColor={loginData.email.includes("@") && loginData.email.includes(".com") ? "#11daac" : "#cccccc"}
                width="100%"
                borderRadius={"35px/35px"}
                h="50px"
                fontSize="18px"
                _hover={{ backgroundColor: loginData.email.includes("@") && loginData.email.includes(".com") ? "#11daac" : "#cccccc" }}
                disabled={!loginData.email.includes("@") || !loginData.email.includes(".com")}
              >
                Sign In
              </Button>

              <HStack spacing={"0px"} mt="19px" gap="2">
                <Box fontSize={"14px"}> New member?</Box>
                <Link
                  fontSize={"15px"}
                  fontWeight="500"
                  textDecoration={"underline"}
                  onClick={() => {
                    onClose();
                    navigate("/signup");
                  }}
                >
                  Create an Account
                </Link>
              </HStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Login;
