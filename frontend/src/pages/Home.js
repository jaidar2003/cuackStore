import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions, 
  Paper, 
  TextField, 
  Divider, 
  Chip,
  Rating,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  ArrowForward, 
  LocalShipping, 
  Security, 
  ThumbUp, 
  Send as SendIcon 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock data for featured products
const featuredProducts = [
  {
    id: 1,
    name: 'Custom 3D Printed Vase',
    description: 'Beautiful custom designed vase, perfect for any home decor.',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1578500351865-fa9998d46d97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    rating: 4.5
  },
  {
    id: 2,
    name: 'Graphic Design T-Shirt',
    description: 'Comfortable cotton t-shirt with unique graphic design.',
    price: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    rating: 4.2
  },
  {
    id: 3,
    name: '3D Printed Planter',
    description: 'Modern geometric planter for small plants and succulents.',
    price: 27.99,
    imageUrl: 'https://images.unsplash.com/photo-1558603668-6570496b66f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    rating: 4.7
  },
  {
    id: 4,
    name: 'Custom Logo Mug',
    description: 'Ceramic mug with custom printed logo or design.',
    price: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    rating: 4.3
  }
];

// Mock data for categories
const categories = [
  {
    id: 1,
    name: '3D Prints',
    imageUrl: 'https://images.unsplash.com/photo-1578500351865-fa9998d46d97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    count: 15
  },
  {
    id: 2,
    name: 'T-Shirts',
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    count: 12
  },
  {
    id: 3,
    name: 'Mugs',
    imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    count: 8
  },
  {
    id: 4,
    name: 'Phone Cases',
    imageUrl: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    count: 7
  }
];

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    text: 'The quality of the 3D printed items is amazing! I ordered a custom vase and it exceeded my expectations.',
    rating: 5
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=5',
    text: 'I love my custom t-shirt! The print quality is excellent and the fabric is very comfortable.',
    rating: 4
  },
  {
    id: 3,
    name: 'Robert Johnson',
    avatar: 'https://i.pravatar.cc/150?img=8',
    text: 'Great customer service and fast shipping. The products are high quality and exactly as described.',
    rating: 5
  }
];

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  Custom 3D Prints & Designs
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                  Bring your creative ideas to life with our high-quality 3D printing and custom design services.
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={<ArrowForward />}
                  component={Link}
                  to="/products"
                  className="hover-scale"
                  sx={{ 
                    py: 1.5, 
                    px: 4, 
                    borderRadius: 2,
                    fontSize: '1.1rem'
                  }}
                >
                  Shop Now
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div 
                variants={itemVariants}
                className="float"
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1578500351865-fa9998d46d97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
                  alt="3D Printed Vase"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 4,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    transform: 'perspective(1000px) rotateY(-10deg)',
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
        
        {/* Background decorations */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            zIndex: 0
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            zIndex: 0
          }}
        />
      </Box>
      
      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <motion.div variants={itemVariants}>
              <Paper
                elevation={0}
                className="glass card-hover"
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  borderRadius: 4
                }}
              >
                <LocalShipping color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Free Shipping
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Free shipping on all orders over $50. Fast delivery to your doorstep.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <motion.div variants={itemVariants}>
              <Paper
                elevation={0}
                className="glass card-hover"
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  borderRadius: 4
                }}
              >
                <Security color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Secure Payments
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your payments are secure with our trusted payment processing system.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <motion.div variants={itemVariants}>
              <Paper
                elevation={0}
                className="glass card-hover"
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  borderRadius: 4
                }}
              >
                <ThumbUp color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Quality Guarantee
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We stand behind our products with a 100% satisfaction guarantee.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      
      {/* Featured Products Section */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <motion.div variants={itemVariants}>
            <Typography 
              variant="h4" 
              component="h2" 
              fontWeight="bold" 
              textAlign="center"
              sx={{ mb: 1 }}
            >
              Featured Products
            </Typography>
            <Typography 
              variant="subtitle1" 
              color="text.secondary" 
              textAlign="center"
              sx={{ mb: 6 }}
            >
              Check out our most popular items
            </Typography>
          </motion.div>
          
          <Grid container spacing={4}>
            {featuredProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={3}>
                <motion.div variants={itemVariants}>
                  <Card 
                    className="card-hover"
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      borderRadius: 4,
                      overflow: 'hidden'
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.imageUrl}
                      alt={product.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {product.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Rating value={product.rating} precision={0.5} readOnly size="small" />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          {product.rating}
                        </Typography>
                      </Box>
                      <Typography variant="h6" color="primary" fontWeight="bold">
                        ${product.price.toFixed(2)}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button 
                        variant="outlined" 
                        color="primary" 
                        component={Link}
                        to={`/products/${product.id}`}
                        fullWidth
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <motion.div variants={itemVariants}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/products"
                endIcon={<ArrowForward />}
                sx={{ borderRadius: 2, px: 4 }}
              >
                View All Products
              </Button>
            </motion.div>
          </Box>
        </Container>
      </Box>
      
      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div variants={itemVariants}>
          <Typography 
            variant="h4" 
            component="h2" 
            fontWeight="bold" 
            textAlign="center"
            sx={{ mb: 1 }}
          >
            Shop by Category
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            textAlign="center"
            sx={{ mb: 6 }}
          >
            Browse our collections
          </Typography>
        </motion.div>
        
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item key={category.id} xs={6} md={3}>
              <motion.div variants={itemVariants}>
                <Box
                  component={Link}
                  to={`/products?category=${category.name.toLowerCase().replace(' ', '-')}`}
                  sx={{
                    position: 'relative',
                    display: 'block',
                    height: 200,
                    borderRadius: 4,
                    overflow: 'hidden',
                    '&:hover img': {
                      transform: 'scale(1.05)'
                    },
                    '&:hover .overlay': {
                      backgroundColor: 'rgba(0, 0, 0, 0.4)'
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={category.imageUrl}
                    alt={category.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                  <Box
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      transition: 'background-color 0.3s ease'
                    }}
                  >
                    <Typography variant="h6" color="white" fontWeight="bold">
                      {category.name}
                    </Typography>
                    <Chip 
                      label={`${category.count} Products`} 
                      size="small" 
                      sx={{ 
                        mt: 1, 
                        color: 'white', 
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)'
                      }} 
                      variant="outlined" 
                    />
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* Testimonials Section */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <motion.div variants={itemVariants}>
            <Typography 
              variant="h4" 
              component="h2" 
              fontWeight="bold" 
              textAlign="center"
              sx={{ mb: 1 }}
            >
              What Our Customers Say
            </Typography>
            <Typography 
              variant="subtitle1" 
              color="text.secondary" 
              textAlign="center"
              sx={{ mb: 6 }}
            >
              Read testimonials from our satisfied customers
            </Typography>
          </motion.div>
          
          <Grid container spacing={4}>
            {testimonials.map((testimonial) => (
              <Grid item key={testimonial.id} xs={12} md={4}>
                <motion.div variants={itemVariants}>
                  <Paper
                    elevation={0}
                    className="glass card-hover"
                    sx={{
                      p: 4,
                      height: '100%',
                      borderRadius: 4,
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {testimonial.name}
                        </Typography>
                        <Rating value={testimonial.rating} readOnly size="small" />
                      </Box>
                    </Box>
                    <Typography variant="body1" paragraph sx={{ flex: 1 }}>
                      "{testimonial.text}"
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* Newsletter Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="md">
          <motion.div variants={itemVariants}>
            <Typography 
              variant="h4" 
              component="h2" 
              fontWeight="bold" 
              textAlign="center"
              sx={{ mb: 2 }}
            >
              Subscribe to Our Newsletter
            </Typography>
            <Typography 
              variant="subtitle1" 
              textAlign="center"
              sx={{ mb: 4, opacity: 0.9 }}
            >
              Get updates on new products, special offers, and more
            </Typography>
            
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              <TextField
                fullWidth
                placeholder="Your email address"
                variant="outlined"
                sx={{
                  mb: { xs: 2, sm: 0 },
                  mr: { sm: 2 },
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                    borderRadius: 2
                  }
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                size="large"
                endIcon={<SendIcon />}
                sx={{ 
                  py: 1.5, 
                  px: 4, 
                  borderRadius: 2,
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                Subscribe
              </Button>
            </Box>
          </motion.div>
        </Container>
        
        {/* Background decorations */}
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            zIndex: 0
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            zIndex: 0
          }}
        />
      </Box>
    </motion.div>
  );
};

export default Home;