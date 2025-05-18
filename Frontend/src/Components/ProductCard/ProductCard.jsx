import React, { useContext } from 'react';
import { Box, Image, Text, Icon, Button, Badge, Flex, IconButton, keyframes, useToast, useDisclosure } from '@chakra-ui/react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../redux/wishlist/wishlist.actions';
import { AuthContext } from '../../ContextApi/AuthContext';
import Login from '../../Pages/Login/Login';

// Define keyframe animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const shine = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const borderSync = keyframes`
  0% { border-color: blue.400; }
  50% { border-color: purple.500; }
  100% { border-color: blue.400; }
`;

const badgeSync = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { isAuth } = useContext(AuthContext);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const wishlistItems = useSelector((state) => state.wishlist.wishlist);
  const isFavorite = wishlistItems.some(item => item._id === product._id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    
    if (!isAuth) {
      onOpen();
      toast({
        title: "Authentication Required",
        description: "Please login to add items to your wishlist",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });
      return;
    }

    if (isFavorite) {
      dispatch(removeFromWishlist(product._id));
      toast({
        title: "Removed from Wishlist",
        description: "Product has been removed from your wishlist",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "bottom"
      });
    } else {
      dispatch(addToWishlist(product));
      toast({
        title: "Added to Wishlist",
        description: "Product has been added to your wishlist",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom"
      });
    }
  };

  return (
    <Box 
      w={{ base: "180px", md: "220px", lg: "240px" }}
      bg="white"
      position="relative"
      transition="all 0.3s ease"
      _hover={{ 
        transform: 'scale(1.05)',
        boxShadow: 'lg'
      }}
      boxShadow="sm"
      borderRadius="sm"
      overflow="hidden"
      animation={`${float} 3s ease-in-out infinite`}
    >
      <Box 
        position="relative" 
        bg="#fbf9f7"
        _hover={{
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
            backgroundSize: '200% 200%',
            animation: `${shine} 2s linear infinite`
          }
        }}
      >
        <Image
          src={product.image}
          alt={product.title}
          w="100%"
          h={{ base: "180px", md: "220px", lg: "240px" }}
          objectFit="contain"
          p={4}
          transition="transform 0.3s ease"
          _hover={{ transform: 'scale(1.1)' }}
        />
        <IconButton
          icon={isFavorite ? <FaHeart /> : <FaRegHeart />}
          position="absolute"
          top={2}
          right={2}
          colorScheme={isFavorite ? "red" : "gray"}
          bg="white"
          _hover={{ 
            bg: 'white',
            transform: 'scale(1.2)',
            color: isFavorite ? 'red.500' : 'gray.500'
          }}
          size="sm"
          onClick={handleWishlistToggle}
          animation={`${pulse} 2s ease-in-out infinite`}
        />
        <Badge
          position="absolute"
          bottom={2}
          left={2}
          bgGradient="linear(to-r, #00b9c5, #00a5b0, #008c96)"
          color="white"
          fontSize="xs"
          px={2}
          py={0.5}
          borderRadius="sm"
          _hover={{
            transform: 'scale(1.1)',
            bgGradient: "linear(to-r, #008c96, #00b9c5, #00a5b0)"
          }}
          transition="all 0.3s ease"
          animation={`${badgeSync} 3s ease-in-out infinite`}
        >
          {product.offer}
        </Badge>
      </Box>
      
      <Box p={3}>
        <Text 
          fontSize="sm" 
          fontWeight="600" 
          mb={1}
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
          _hover={{
            bgGradient: "linear(to-r, blue.500, purple.600)"
          }}
          transition="all 0.3s ease"
        >
          {product.title}
        </Text>
        <Text fontSize="xs" color="gray.600" mb={2}>
          {product.description}
        </Text>
        <Flex justify="space-between" align="center" mb={2}>
          <Text fontSize="sm" fontWeight="bold" color="blue.600">
            ₹{product.price}
          </Text>
          <Text fontSize="xs" color="gray.500" textDecoration="line-through">
            ₹{product.originalPrice}
          </Text>
        </Flex>
        <Link to={`/product/${product.id}`}>
          <Button
            size="sm"
            w="full"
            bg="transparent"
            color="blue.500"
            border="2px"
            borderColor="blue.400"
            _hover={{
              bg: "blue.50",
              transform: "scale(1.05)",
              borderColor: "purple.500"
            }}
            transition="all 0.3s ease"
            animation={`${borderSync} 2s linear infinite`}
          >
            View
          </Button>
        </Link>
      </Box>
      <Login isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default ProductCard; 