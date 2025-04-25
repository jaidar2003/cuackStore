import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Divider, 
  List, 
  ListItem, 
  ListItemText, 
  CircularProgress, 
  Alert,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  CheckCircle, 
  ShoppingBag, 
  Home, 
  Receipt 
} from '@mui/icons-material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock order data (will be replaced with API call)
const mockOrder = {
  id: 123456,
  date: new Date().toISOString(),
  status: 'Confirmed',
  items: [
    {
      id: 1,
      name: "Custom 3D Printed Vase",
      price: 29.99,
      quantity: 2,
      imageUrl: "https://images.unsplash.com/photo-1578500351865-fa9998d46d97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      name: "Graphic Design T-Shirt",
      price: 24.99,
      quantity: 1,
      imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      name: "3D Printed Planter",
      price: 27.99,
      quantity: 1,
      imageUrl: "https://images.unsplash.com/photo-1558603668-6570496b66f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    }
  ],
  shippingInfo: {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipCode: '12345',
    country: 'United States',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567'
  },
  paymentInfo: {
    method: 'Credit Card',
    cardLast4: '4242',
    expiryDate: '12/25'
  },
  subtotal: 112.96,
  tax: 7.91,
  shipping: 0,
  total: 120.87,
  estimatedDelivery: '3-5 business days'
};

const OrderConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Load order data
  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await axios.get(`/api/orders/${id}`);
        // setOrder(response.data);
        
        // Mock implementation
        setTimeout(() => {
          // Use the order ID from the URL
          const mockOrderWithId = {
            ...mockOrder,
            id: parseInt(id) || mockOrder.id
          };
          setOrder(mockOrderWithId);
          setLoading(false);
        }, 800); // Simulate network delay
      } catch (err) {
        setError("Failed to load order details. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [id]);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
          variant="contained" 
          color="primary"
          component={Link}
          to="/"
          sx={{ mt: 2 }}
        >
          Return to Home
        </Button>
      </Container>
    );
  }
  
  if (!order) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Order not found. It may have been deleted or the URL is incorrect.
        </Alert>
        <Button 
          variant="contained" 
          color="primary"
          component={Link}
          to="/"
          sx={{ mt: 2 }}
        >
          Return to Home
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Success Message */}
        <motion.div variants={itemVariants}>
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
              mb: 4
            }}
            className="glass"
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 3
              }}
            >
              <CheckCircle 
                color="success" 
                sx={{ 
                  fontSize: 80, 
                  mb: 2,
                  animation: 'pulse 2s infinite'
                }} 
              />
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Order Confirmed!
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Thank you for your purchase
              </Typography>
            </Box>
            
            <Box sx={{ my: 3 }}>
              <Typography variant="body1" paragraph>
                Your order #{order.id} has been placed successfully on {formatDate(order.date)}.
              </Typography>
              <Typography variant="body1" paragraph>
                We've sent a confirmation email to <strong>{order.shippingInfo.email}</strong> with all the details.
              </Typography>
              <Typography variant="body1">
                Estimated delivery: <strong>{order.estimatedDelivery}</strong>
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingBag />}
                component={Link}
                to="/products"
                sx={{ borderRadius: 2, px: 3 }}
              >
                Continue Shopping
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Receipt />}
                component={Link}
                to="/my-orders"
                sx={{ borderRadius: 2, px: 3 }}
              >
                View My Orders
              </Button>
            </Box>
          </Paper>
        </motion.div>
        
        {/* Order Details */}
        <Grid container spacing={4}>
          {/* Order Summary */}
          <Grid item xs={12} md={8}>
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
                  mb: 3
                }}
                className="glass"
              >
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Order Details
                </Typography>
                
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Order Number
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      #{order.id}
                    </Typography>
                    
                    <Typography variant="subtitle1" fontWeight="bold">
                      Order Date
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {formatDate(order.date)}
                    </Typography>
                    
                    <Typography variant="subtitle1" fontWeight="bold">
                      Order Status
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {order.status}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Payment Method
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {order.paymentInfo.method} (**** {order.paymentInfo.cardLast4})
                    </Typography>
                    
                    <Typography variant="subtitle1" fontWeight="bold">
                      Shipping Method
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      Standard Shipping
                    </Typography>
                    
                    <Typography variant="subtitle1" fontWeight="bold">
                      Estimated Delivery
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {order.estimatedDelivery}
                    </Typography>
                  </Grid>
                </Grid>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Items Ordered
                </Typography>
                
                <List disablePadding>
                  {order.items.map((item) => (
                    <ListItem key={item.id} sx={{ py: 2, px: 0 }}>
                      <Box
                        component="img"
                        src={item.imageUrl}
                        alt={item.name}
                        sx={{
                          width: 60,
                          height: 60,
                          objectFit: 'cover',
                          borderRadius: 2,
                          mr: 2
                        }}
                      />
                      <ListItemText
                        primary={item.name}
                        secondary={`Quantity: ${item.quantity}`}
                      />
                      <Typography variant="body1" fontWeight="bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </motion.div>
          </Grid>
          
          {/* Shipping and Payment Info */}
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
                  mb: 3
                }}
                className="glass"
              >
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Shipping Address
                </Typography>
                <Typography variant="body1">
                  {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                </Typography>
                <Typography variant="body1">
                  {order.shippingInfo.address}
                </Typography>
                <Typography variant="body1">
                  {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {order.shippingInfo.country}
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                  Email: {order.shippingInfo.email}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Phone: {order.shippingInfo.phone}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Order Summary
                </Typography>
                
                <List disablePadding>
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Subtotal" />
                    <Typography variant="body1">${order.subtotal.toFixed(2)}</Typography>
                  </ListItem>
                  
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Tax" />
                    <Typography variant="body1">${order.tax.toFixed(2)}</Typography>
                  </ListItem>
                  
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Shipping" />
                    <Typography variant="body1">
                      {order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}
                    </Typography>
                  </ListItem>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={<Typography variant="h6" fontWeight="bold">Total</Typography>} />
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      ${order.total.toFixed(2)}
                    </Typography>
                  </ListItem>
                </List>
              </Paper>
              
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                startIcon={<Home />}
                component={Link}
                to="/"
                sx={{ 
                  py: 1.5,
                  borderRadius: 2
                }}
              >
                Return to Home
              </Button>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default OrderConfirmation;