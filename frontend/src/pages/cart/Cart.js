import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  IconButton, 
  Divider, 
  TextField, 
  Card, 
  CardMedia, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  CircularProgress, 
  Alert,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Add, 
  Remove, 
  Delete, 
  ShoppingCart, 
  ArrowForward, 
  ArrowBack 
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock data for cart items (will be replaced with actual cart state)
const mockCartItems = [
  {
    id: 1,
    productId: 1,
    name: "Custom 3D Printed Vase",
    price: 29.99,
    quantity: 2,
    imageUrl: "https://images.unsplash.com/photo-1578500351865-fa9998d46d97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    stockQuantity: 15
  },
  {
    id: 2,
    productId: 3,
    name: "Graphic Design T-Shirt",
    price: 24.99,
    quantity: 1,
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    stockQuantity: 20
  },
  {
    id: 3,
    productId: 7,
    name: "3D Printed Planter",
    price: 27.99,
    quantity: 1,
    imageUrl: "https://images.unsplash.com/photo-1558603668-6570496b66f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    stockQuantity: 12
  }
];

const Cart = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Cart summary calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxRate = 0.07; // 7% tax
  const tax = subtotal * taxRate;
  const shippingCost = subtotal > 100 ? 0 : 10; // Free shipping for orders over $100
  const total = subtotal + tax + shippingCost;
  
  // Load cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call or from a cart context
        // const response = await axios.get('/api/cart');
        // setCartItems(response.data);
        
        // Mock implementation
        setTimeout(() => {
          setCartItems(mockCartItems);
          setLoading(false);
        }, 800); // Simulate network delay
      } catch (err) {
        setError("Failed to load cart items. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchCartItems();
  }, []);
  
  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { 
              ...item, 
              quantity: Math.max(1, Math.min(newQuantity, item.stockQuantity)) 
            } 
          : item
      )
    );
  };
  
  // Remove item from cart
  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
  };
  
  // Proceed to checkout
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
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
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBack />} 
          component={Link}
          to="/products"
          sx={{ mt: 2 }}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }
  
  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: 'center',
              borderRadius: 4,
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
            }}
            className="glass"
          >
            <Box
              component="img"
              src="https://illustrations.popsy.co/violet/empty-cart.svg"
              alt="Empty Cart"
              sx={{
                width: '100%',
                maxWidth: 300,
                height: 'auto',
                mb: 4,
                mx: 'auto',
              }}
            />
            
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              Your Cart is Empty
            </Typography>
            
            <Typography variant="body1" color="text.secondary" paragraph>
              Looks like you haven't added any products to your cart yet.
            </Typography>
            
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/products"
              startIcon={<ShoppingCart />}
              sx={{ 
                mt: 2,
                py: 1.5,
                px: 4,
                borderRadius: 2
              }}
            >
              Start Shopping
            </Button>
          </Paper>
        </motion.div>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        fontWeight="bold"
        className="text-gradient"
        sx={{ mb: 4 }}
      >
        Your Shopping Cart
      </Typography>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <motion.div variants={itemVariants}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, md: 3 },
                  borderRadius: 4,
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
                  mb: 3
                }}
                className="glass"
              >
                <List sx={{ width: '100%' }}>
                  {cartItems.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <ListItem
                        alignItems="flex-start"
                        secondaryAction={
                          <IconButton 
                            edge="end" 
                            aria-label="delete"
                            onClick={() => handleRemoveItem(item.id)}
                            color="error"
                          >
                            <Delete />
                          </IconButton>
                        }
                        sx={{ py: 2 }}
                      >
                        <ListItemAvatar sx={{ mr: 2 }}>
                          <Avatar 
                            variant="rounded" 
                            src={item.imageUrl} 
                            alt={item.name}
                            sx={{ 
                              width: 80, 
                              height: 80,
                              borderRadius: 2
                            }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="h6" component="div" fontWeight="bold">
                              {item.name}
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Unit Price: ${item.price.toFixed(2)}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <Typography variant="body2" sx={{ mr: 2 }}>
                                  Quantity:
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <IconButton 
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                    size="small"
                                  >
                                    <Remove fontSize="small" />
                                  </IconButton>
                                  <TextField
                                    value={item.quantity}
                                    onChange={(e) => {
                                      const value = parseInt(e.target.value);
                                      if (!isNaN(value)) {
                                        handleQuantityChange(item.id, value);
                                      }
                                    }}
                                    inputProps={{ 
                                      min: 1, 
                                      max: item.stockQuantity,
                                      style: { textAlign: 'center' }
                                    }}
                                    sx={{ width: 40, mx: 1 }}
                                    size="small"
                                  />
                                  <IconButton 
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    disabled={item.quantity >= item.stockQuantity}
                                    size="small"
                                  >
                                    <Add fontSize="small" />
                                  </IconButton>
                                </Box>
                              </Box>
                            </Box>
                          }
                        />
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', height: '100%', ml: 2 }}>
                          <Typography variant="h6" color="primary" fontWeight="bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>
                      </ListItem>
                      {index < cartItems.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, px: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<ArrowBack />}
                    component={Link}
                    to="/products"
                  >
                    Continue Shopping
                  </Button>
                  
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
          
          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <motion.div variants={itemVariants}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
                  position: 'sticky',
                  top: 20
                }}
                className="glass"
              >
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Order Summary
                </Typography>
                
                <List disablePadding>
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Subtotal" />
                    <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
                  </ListItem>
                  
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={`Tax (${(taxRate * 100).toFixed(0)}%)`} />
                    <Typography variant="body1">${tax.toFixed(2)}</Typography>
                  </ListItem>
                  
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Shipping" />
                    <Typography variant="body1">
                      {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                    </Typography>
                  </ListItem>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={<Typography variant="h6" fontWeight="bold">Total</Typography>} />
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      ${total.toFixed(2)}
                    </Typography>
                  </ListItem>
                </List>
                
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  endIcon={<ArrowForward />}
                  onClick={handleCheckout}
                  sx={{ 
                    mt: 3,
                    py: 1.5,
                    borderRadius: 2
                  }}
                >
                  Proceed to Checkout
                </Button>
                
                {subtotal < 100 && (
                  <Alert severity="info" sx={{ mt: 3 }}>
                    Add ${(100 - subtotal).toFixed(2)} more to qualify for free shipping!
                  </Alert>
                )}
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Cart;