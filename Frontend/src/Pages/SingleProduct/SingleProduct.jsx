import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CartPage/action";
import { addToWishlist } from "../../redux/wishlist/wishlist.actions";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import ProdCard from "./ProdCard";
import { ProdImage } from "./ProdImage";
import axios from "axios";
import { Grid, GridItem, Image } from "@chakra-ui/react";
import { API_URL } from "../../config";
import { AuthContext } from "../../ContextApi/AuthContext";

const SingleProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.CartReducer);
  const { isAuth } = useContext(AuthContext);

  const handleAddToCart = () => {
    const existingItem = cart.findIndex((item) => item._id === data._id);
    if (existingItem === -1) {
      data.quantity = 1;
      dispatch(addToCart(data));
      setTimeout(() => {
        navigate("/cart");
      }, 1000);
    } else {
      alert("Product Already Add in Cart");
    }
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(data));
    setTimeout(() => {
      navigate("/wishlist");
    }, 1000);
  };

  const trackProductVisit = async () => {
    if (isAuth) {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        console.log('Tracking product visit for:', id);
        
        const response = await fetch(`${API_URL}/product/visit/${id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        console.log('Visit tracking response:', data);
        
        if (!response.ok) {
          console.error('Failed to track product visit:', data.message);
        }
      } catch (error) {
        console.error('Error tracking product visit:', error);
      }
    }
  };

  const fetchSingleProduct = () => {
    axios(`${API_URL}/product/${id}`)
      .then((res) => {
        setData(res.data.product);
        // Track visit after product data is loaded
        trackProductVisit();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);

  return (
    <>
      <Navbar />
      <br />
      <br />

      <Grid
        gap={5}
        m="auto"
        w="95%"
        justifyContent="space-around"
        templateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(3,1fr)"
        }}
      >
        <GridItem
          borderRadius={10}
          p="80px 5px"
          border="1px solid"
          borderColor="gray.300"
          display={{ lg: "inherit", base: "none" }}
          _hover={{ transform: "scale(1.1)" }}
        >
          <Image src={data.imageTsrc} />
        </GridItem>
        <GridItem
          borderRadius={10}
          p="80px 5px"
          border="1px solid"
          borderColor="gray.300"
          w={{ lg: "100%", sm: "80%", base: "80%" }}
          m="auto"
        >
          <Image _hover={{ transform: "scale(1.1)" }} src={data.imageTsrc} />
        </GridItem>
        <GridItem
          p={5}
          colSpan={1}
          rowSpan={10}
          m="auto"
          justifyContent="center"
        >
          <ProdCard
            type={data}
            handleCart={handleAddToCart}
            handleWishlist={handleAddToWishlist}
          />
        </GridItem>

        {ProdImage.map((ele, i) => (
          <GridItem
            _hover={{ transform: "scale(1.1)" }}
            display={{ lg: "inherit", base: "none" }}
            borderRadius={10}
            p="80px 5px"
            border="1px solid"
            borderColor="gray.300"
            key={i}
          >
            <Image src={ele.src} />
          </GridItem>
        ))}

        <GridItem
          _hover={{ transform: "scale(1.1)" }}
          display={{ lg: "inherit", base: "none" }}
          borderRadius={10}
          p="80px 5px"
          border="1px solid"
          borderColor="gray.300"
        >
          <Image src={data.imageTsrc} />
        </GridItem>
        <GridItem
          _hover={{ transform: "scale(1.1)" }}
          display={{ lg: "inherit", base: "none" }}
          borderRadius={10}
          p="80px 5px"
          border="1px solid"
          borderColor="gray.300"
        >
          <Image src={data.imageTsrc} />
        </GridItem>
      </Grid>
      <Footer />
    </>
  );
};

export default SingleProduct;
