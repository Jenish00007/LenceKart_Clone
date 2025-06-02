import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Center,
  Heading,
  HStack,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Input,
  Checkbox,
  InputRightElement,
  Text,
  useToast,
  Divider
} from "@chakra-ui/react";
import { API_URL } from "../../config";
import Login from "../Login/Login";
import GoogleLoginButton from "../../Components/GoogleLoginButton";

const Signup = () => {
  const init = {
    first_name: "",
    last_name: "",
    ph_no: "",
    email: "",
    password: ""
  };

  const [userData, setUserData] = useState(init);
  const [first, setFirst] = useState();
  const [last, setLast] = useState();
  const [ph, setPh] = useState();
  const [mail, setMail] = useState();
  const [pass, setPass] = useState();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [Auth, setAuth] = useState();
  const [exist, setExist] = useState(false);
  const [success, setSuccess] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showLogin, setShowLogin] = useState(false);
  const toast = useToast();
  var flag = false;

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

    // Reset the "email exists" error when email is changed
    if (name === "email") {
      setExist(false);
    }

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

      case "ph_no":
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

      case "password":
        setPass(
          value === "" ? (
            <Required info="This is a required feild" />
          ) : (
            <Required info="Password should be more than 6 characters." />
          )
        );
        break;

      default:
        break;
    }
  };

  const getData = async () => {
    try {
      setLoading(true);
      setExist(false);
      if (userData.email !== "" && userData.password !== "") {
        const res = await fetch(
          `${API_URL}/user/register`,
          {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
              "Content-type": "application/json"
            }
          }
        );
        
        // Check if response is ok (status 200-299)
        if (res.ok) {
          try {
            let data = await res.json();
            // Store token if present
            if (data.token) {
              localStorage.setItem("token", data.token);
            }
            setAuth(true);
            setLoading(false);
            setSuccess(true);
            toast({
              title: "Registration Successful",
              description: "You have successfully registered!",
              status: "success",
              duration: 5000,
              isClosable: true
            });
            // Close the signup modal and show login modal after a brief delay
            setTimeout(() => {
              onClose();
              setShowLogin(true);
            }, 1500);
          } catch (error) {
            // Handle case where response is not JSON (like plain text "Registered")
            console.log("Registration successful");
            setAuth(true);
            setLoading(false);
            setSuccess(true);
            toast({
              title: "Registration Successful",
              description: "You have successfully registered!",
              status: "success",
              duration: 5000,
              isClosable: true
            });
            // Close the signup modal and show login modal after a brief delay
            setTimeout(() => {
              onClose();
              setShowLogin(true);
            }, 1500);
          }
        } else {
          // Check if the error is due to existing email
          try {
            const errorData = await res.json();
            
            if (res.status === 409 || 
               (errorData && (
                errorData.message?.includes("exists") || 
                errorData.error?.includes("exists")
               ))) {
              setExist(true);
            } else {
              console.log("Registration failed:", errorData);
              setExist(true); // Generic error for now, can be refined later
            }
          } catch (error) {
            // If we can't parse the error as JSON
            console.log("Error parsing response:", error);
            setExist(res.status === 409); // Set true only for 409 Conflict status
          }
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      setExist(true);
      console.log("An error occurred. Please try again later.", error);
    }
  };

  const handleRegister = () => {
    getData();
  };

  const handleOpen = () => {
    setExist(false);
    setSuccess(false);
    setUserData(init);
    setFirst(undefined);
    setLast(undefined);
    setPh(undefined);
    setMail(undefined);
    setPass(undefined);
    onOpen();
  };

  const handleModalClose = () => {
    setExist(false);
    setSuccess(false);
    setUserData(init);
    onClose();
  };

  const handleSignInClick = () => {
    onClose(); // Close the signup modal
    setShowLogin(true); // Show the login modal
  };

  return (
    <div>
      <Center onClick={handleOpen} fontWeight={"400"} fontSize="15px" w="60px" data-signup-button>
        Sign Up
      </Center>

      <Modal isOpen={isOpen} onClose={handleModalClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent w="lg" pt="5" rounded="3xl">
          <ModalCloseButton />

          <ModalBody p={"0px 0px "}>
            <Box m={"5px 45px 20px 45px"}>
              <Heading
                fontFamily={" Times, serif"}
                fontWeight="100"
                fontSize={"26px"}
                mb="20px"
                color={"#333368"}
              >
                Create an Account
              </Heading>

              <Input
                type="text"
                fontSize="16px"
                onChange={handleChange}
                focusBorderColor="rgb(206, 206, 223)"
                name="first_name"
                placeholder="First Name*"
                h={"45px"}
                borderColor={"rgb(206, 206, 223)"}
                m={"8px 0px 15px 0px"}
                rounded="2xl"
              />

              <Text mt="-2%" ml="2%">
                {first}
              </Text>

              <Input
                fontSize="16px"
                onChange={handleChange}
                name="last_name"
                type="text"
                placeholder="Last Name"
                h={"45px"}
                focusBorderColor="rgb(206, 206, 223)"
                borderColor={"rgb(206, 206, 223)"}
                m={"8px 0px 25px 0px"}
                rounded="2xl"
              />
              <Text mt="-2%" ml="2%">
                {last}
              </Text>

              <InputGroup
                w="100%"
                h="50px"
                fontSize="18px"
                borderRadius="xl"
                mb="14px"
              >
                <InputLeftAddon
                  children="+91"
                  h="45px"
                  fontSize="18px"
                  rounded="2xl"
                  bg="whiteAlpha.900"
                />

                <Input
                  onChange={handleChange}
                  type="number"
                  name="ph_no"
                  placeholder=" Mobile*"
                  w="100%"
                  h="45px"
                  fontSize="16px"
                  focusBorderColor="rgb(206, 206, 223)"
                  borderColor={"rgb(206, 206, 223)"}
                  rounded="2xl"
                />
              </InputGroup>
              <Text mt="-2%" ml="2%">
                {userData.ph_no.length === 10 ? "" : ph}
              </Text>

              <Input
                onChange={handleChange}
                fontSize="16px"
                name="email"
                placeholder="Email*"
                h={"45px"}
                focusBorderColor="rgb(206, 206, 223)"
                borderColor={"rgb(206, 206, 223)"}
                m={"8px 0px 18px 0px"}
                rounded="2xl"
              />
              <Text mt="-2%" ml="2%">
                {userData.email.includes("@") && userData.email.includes(".com")
                  ? ""
                  : mail}
              </Text>

              <InputGroup mb="15px">
                <Input
                  onChange={handleChange}
                  fontSize="16px"
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="Password*"
                  h={"45px"}
                  focusBorderColor="rgb(206, 206, 223)"
                  borderColor={"rgb(206, 206, 223)"}
                  m={"8px 0px 8px 0px"}
                  rounded="2xl"
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
              {userData.password.length >= 6 ? "" : pass}

              {/* <HStack>
                <Box
                  textDecoration={"underline"}
                  fontFamily={" sans-serif"}
                  color={"#333368"}
                  fontSize="14px"
                >
                  Got a Referral code?
                </Box>

                <Box fontFamily={" sans-serif"} color={"#333368"}>
                  (Optional)
                </Box>
              </HStack>

              <HStack>
                <Checkbox
                  mb={"20px"}
                  mt="20px"
                  size="sm"
                  fontFamily={" sans-serif"}
                >
                  Get Update on whatsapp
                </Checkbox>
                <Image
                  src="https://static.lenskart.com/media/desktop/img/25-July-19/whatsapp.png"
                  w={"22px"}
                  h="22px"
                />
              </HStack> */}
              {exist === true ? (
                <Required info="Email Id already exists" />
              ) : (
                ""
              )}

              {success && (
                <Box
                  fontSize={"14px"}
                  m="3px 0px 8px 0px"
                  color={"green.500"}
                  fontWeight="500"
                  letterSpacing={"-0.4px"}
                >
                  Registration successful! Redirecting...
                </Box>
              )}

              <HStack spacing={"3px"} mb="10px">
                <Box
                  fontSize={"14px"}
                  fontFamily={" sans-serif"}
                  fontWeight="100"
                  letterSpacing={"-0.4px"}
                >
                  By creating this account, you agree to our
                </Box>
                <Box fontSize={"15px"} textDecoration="underline">
                  Privacy Policy
                </Box>
              </HStack>

              {userData.email.includes("@") &&
              userData.email.includes(".com") &&
              userData.first_name.length >= 1 &&
              userData.last_name.length >= 1 &&
              userData.password.length >= 6 &&
              userData.ph_no.length === 10 ? (
                <Button
                  isLoading={loading}
                  onClick={handleRegister}
                  bgColor={"#11daac"}
                  width="100%"
                  borderRadius={"35px/35px"}
                  h="50px"
                  _hover={{ backgroundColor: "#11daac" }}
                  fontFamily={" sans-serif"}
                  fontWeight="300"
                  fontSize="18px"
                >
                  Create an Account
                </Button>
              ) : (
                <Button
                  bgColor={"#cccccc"}
                  width="100%"
                  borderRadius={"35px/35px"}
                  h="50px"
                  fontFamily={" sans-serif"}
                  fontWeight="300"
                  fontSize="18px"
                >
                  Create an Account
                </Button>
              )}
               <HStack spacing={4} my={4}>
                <Divider flex={1} />
                <Text fontSize="sm" color="gray.500">OR</Text>
                <Divider flex={1} />
              </HStack>
<GoogleLoginButton />
              <Center mt={"14px"} fontSize="15px" gap="2">
                Have an account?{" "}
                <Box 
                  onClick={handleSignInClick}
                  fontWeight={"400"} 
                  fontSize="15px" 
                  w="80px" 
                  textDecoration={"underline"} 
                  cursor={"pointer"}
                >
                  Sign In
                </Box>
              </Center>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Login Modal */}
      <Login 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)}
        hideButton={true}
      />
    </div>
  );
};

export default Signup;
