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
  InputRightElement
} from "@chakra-ui/react";
import { API_URL } from "../../config";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [btn, setbtn] = useState();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [pass, setpass] = useState(false);
  const [show, setShow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setisAuth, setAuthData, isAuth } = useContext(AuthContext);
  const [incorrect, setinCorrect] = useState(false);
  const navigate = useNavigate();
  let res1 = [];

  // Check for existing token on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Fetch user data using token
          const response = await fetch(`${API_URL}/user`);
          if (response.ok) {
            const userData = await response.json();
            if (userData && userData.length > 0) {
              setisAuth(true);
              setAuthData(userData);
            }
          }
        } catch (error) {
          console.log("Error verifying authentication:", error);
        }
      }
    };

    if (!isAuth) {
      checkAuthStatus();
    }
  }, [setisAuth, setAuthData, isAuth]);

  const handlechange = (e) => {
    setinCorrect(false);
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });

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
  };

  const getData = async () => {
    try {
      setLoading(true);
      setinCorrect(false);
      if (loginData.email !== "" && loginData.password !== "") {
        // Login request
        const res = await fetch(
          `${API_URL}/user/login`,
          {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
              "Content-type": "application/json"
            }
          }
        );
        
        if (res.ok) {
          let data = await res.json();
          const token = data.token;
          
          if (token) {
            // Save token in local storage
            localStorage.setItem("token", token);
            
            // Clear any expired/old tokens
            sessionStorage.removeItem("token");
            
            // Fetch user data with token
            const userResponse = await fetch(
              `${API_URL}/user`,
              {
                headers: {
                  "Authorization": `Bearer ${token}`
                }
              }
            );
            
            if (userResponse.ok) {
              const allUsers = await userResponse.json();
              // Find the current user
              const currentUser = allUsers.filter(el => el.email === loginData.email);
              
              if (currentUser && currentUser.length > 0) {
                // Store user data
                setAuthData(currentUser);
                setisAuth(true);
                
                // If admin, navigate to product list
                if (loginData.email.includes(process.env.admin)) {
                  navigate("/productlist");
                }
                
                setLoading(false);
                setinCorrect(false);
                onClose();
              } else {
                handleLoginError();
              }
            } else {
              handleLoginError();
            }
          } else {
            handleLoginError();
          }
        } else {
          handleLoginError();
        }
      }
    } catch (error) {
      handleLoginError();
      console.log("An error occurred during login:", error);
    }
  };
  
  // Helper function to handle login errors
  const handleLoginError = () => {
    setLoading(false);
    setinCorrect(true);
    localStorage.removeItem("token"); // Clear any invalid token
  };

  const handleClick = () => {
    loginData.password = "";
    setpass(false);
  };

  const handlesign = () => {
    setpass(true);
    if (loginData.password.length > 6) {
      getData(loginData);
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

              {pass === false ? (
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

                  {incorrect === true ? (
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
                  ) : (
                    ""
                  )}
                </Box>
              )}
              <Box
                textDecoration={"underline"}
                m="15px 0px 0px 0px"
                color="#000042"
                fontSize="15px"
              >
                Forget Password
              </Box>
              {loginData.email.includes("@") && loginData.email.includes(".com")
                ? ""
                : btn}

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
              {loginData.email.includes("@") &&
              loginData.email.includes(".com") ? (
                <Button
                  isLoading={loading}
                  onClick={handlesign}
                  bgColor={"#11daac"}
                  width="100%"
                  borderRadius={"35px/35px"}
                  h="50px"
                  fontSize="18px"
                  _hover={{ backgroundColor: "#11daac" }}
                >
                  Sign In
                </Button>
              ) : (
                <Button
                  bgColor={"#cccccc"}
                  width="100%"
                  borderRadius={"35px/35px"}
                  fontSize="18px"
                  h="50px"
                  _hover={{ backgroundColor: "#cccccc" }}
                >
                  Sign In
                </Button>
              )}

              <HStack spacing={"0px"} mt="19px" gap="2">
                <Box fontSize={"14px"}> New member?</Box>
                <Link
                  fontSize={"15px"}
                  fontWeight="500"
                  textDecoration={"underline"}
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
