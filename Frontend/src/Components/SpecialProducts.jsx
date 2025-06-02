import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Rating, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { API_URL } from '../config';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[4],
  },
}));

const ProductSection = ({ title, products }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
      {title}
    </Typography>
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={3} key={product._id}>
          <StyledCard>
            <CardMedia
              component="img"
              height="200"
              image={product.images[0]}
              alt={product.name}
              sx={{ objectFit: 'contain' }}
            />
            <CardContent>
              <Typography variant="h6" noWrap>
                {product.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Rating value={product.rating} readOnly precision={0.5} size="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({product.rating})
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" color="primary">
                  ₹{product.price}
                </Typography>
                {product.discount > 0 && (
                  <Chip
                    label={`${product.discount}% OFF`}
                    color="secondary"
                    size="small"
                  />
                )}
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const SpecialProducts = () => {
  const [topRated, setTopRated] = useState([]);
  const [latest, setLatest] = useState([]);
  const [exclusive, setExclusive] = useState([]);
  const [offered, setOffered] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [topRatedRes, latestRes, exclusiveRes, offeredRes] = await Promise.all([
          axios.get(`${API_URL}/products/top-rated`),
          axios.get(`${API_URL}/products/latest`),
          axios.get(`${API_URL}/products/exclusive`),
          axios.get(`${API_URL}/products/offered`),
        ]);

        setTopRated(topRatedRes.data);
        setLatest(latestRes.data);
        setExclusive(exclusiveRes.data);
        setOffered(offeredRes.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <ProductSection title="Top Rated Products" products={topRated} />
      <ProductSection title="Latest Arrivals" products={latest} />
      <ProductSection title="Exclusive Products" products={exclusive} />
      <ProductSection title="Special Offers" products={offered} />
    </Box>
  );
};

export default SpecialProducts; 