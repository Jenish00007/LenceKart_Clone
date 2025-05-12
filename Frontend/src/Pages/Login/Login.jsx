import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../ContextApi/AuthContext";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
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
  useToast
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

          // Close modal and navigate based on user role
          onClose();
          if (data.user.role === "admin") {
            navigate("/productlist");
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

            // Close modal and navigate based on user role
            onClose();
            if (userData.role === "admin") {
              navigate("/productlist");
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

              {!pass ? (
                <Input
                  name="email"
                  placeholder="Email"
                  h={"50px"}
                  fontSize="16px"
                  focusBorderColor="rgb(206, 206, 223)"
                  borderColor={"rgb(206, 206, 223)"}
                  onChange={handlechange}
                  rounded="2xl"
                />
              ) : (
                <Box>
                  <Box fontSize={"17px"} color="#66668e">
                    Enter password for
                  </Box>

                  <Flex
                    justifyContent={"space-between"}
                    fontFamily={" sans-serif"}
                    mb="22px"
                    color={"#000042"}
                  >
                    <Box fontSize="18px">{loginData.email}</Box>
                    <Box
                      fontSize={"14px"}
                      textDecoration="underline"
                      onClick={handleClick}
                      cursor="pointer"
                    >
                      Edit
                    </Box>
                  </Flex>

                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      name="password"
                      placeholder="Enter password"
                      h={"50px"}
                      fontSize="16px"
                      focusBorderColor="rgb(206, 206, 223)"
                      borderColor={"rgb(206, 206, 223)"}
                      onChange={handlechange}
                      rounded="2xl"
                    />

                    <InputRightElement width="6.5rem" size="lg">
                      <Button
                        size="md"
                        borderRadius="3xl"
                        mt="10%"
                        onClick={() => setShow(!show)}
                        bg="white"
                      >
                        {show ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  {incorrect && (
                    <Box
                      fontSize={"14px"}
                      m="3px 0px 3px 0px"
                      color={"#ff1f1f"}
                      fontWeight="500"
                      ml="2"
                      letterSpacing={"-0.4px"}
                    >
                      Wrong email or password
                    </Box>
                  )}
                </Box>
              )}

              <Box
                textDecoration={"underline"}
                m="15px 0px 0px 0px"
                color="#000042"
                fontSize="15px"
                cursor="pointer"
              >
                Forget Password
              </Box>

              {btn}

              <HStack fontSize="16px">
                <Checkbox mb={"20px"} mt="20px" size="sm">
                  Get Update on whatsapp
                </Checkbox>
                <Image
                  src="https://static.lenskart.com/media/desktop/img/25-July-19/whatsapp.png"
                  w={"22px"}
                  h="22px"
                />
              </HStack>

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
