import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Stepper, 
  Step, 
  StepLabel, 
  TextField, 
  FormControl, 
  FormControlLabel, 
  RadioGroup, 
  Radio, 
  Checkbox, 
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
  ArrowBack, 
  ArrowForward, 
  Payment, 
  LocalShipping, 
  CheckCircle 
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

// Steps for checkout process
const steps = ['Shipping Information', 'Payment Details', 'Review Order'];

const Checkout = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [activeStep, setActiveStep] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingOrder, setProcessingOrder] = useState(false);
  
  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    saveInfo: false
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });
  
  const [formErrors, setFormErrors] = useState({});
  
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
  
  // Handle form changes
  const handleShippingChange = (e) => {
    const { name, value, checked } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: name === 'saveInfo' ? checked : value
    });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  const handlePaymentChange = (e) => {
    const { name, value, checked } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: name === 'saveCard' ? checked : value
    });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  // Validate shipping form
  const validateShippingForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const zipRegex = /^\d{5}(-\d{4})?$/;
    
    if (!shippingInfo.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!shippingInfo.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!shippingInfo.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(shippingInfo.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!shippingInfo.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(shippingInfo.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!shippingInfo.address.trim()) {
      errors.address = 'Address is required';
    }
    
    if (!shippingInfo.city.trim()) {
      errors.city = 'City is required';
    }
    
    if (!shippingInfo.state.trim()) {
      errors.state = 'State is required';
    }
    
    if (!shippingInfo.zipCode.trim()) {
      errors.zipCode = 'ZIP code is required';
    } else if (!zipRegex.test(shippingInfo.zipCode)) {
      errors.zipCode = 'Please enter a valid ZIP code';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Validate payment form
  const validatePaymentForm = () => {
    const errors = {};
    const cardNumberRegex = /^\d{16}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3,4}$/;
    
    if (!paymentInfo.cardName.trim()) {
      errors.cardName = 'Name on card is required';
    }
    
    if (!paymentInfo.cardNumber.trim()) {
      errors.cardNumber = 'Card number is required';
    } else if (!cardNumberRegex.test(paymentInfo.cardNumber.replace(/\D/g, ''))) {
      errors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    if (!paymentInfo.expiryDate.trim()) {
      errors.expiryDate = 'Expiry date is required';
    } else if (!expiryDateRegex.test(paymentInfo.expiryDate)) {
      errors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }
    
    if (!paymentInfo.cvv.trim()) {
      errors.cvv = 'CVV is required';
    } else if (!cvvRegex.test(paymentInfo.cvv)) {
      errors.cvv = 'Please enter a valid CVV';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle next step
  const handleNext = () => {
    let isValid = false;
    
    if (activeStep === 0) {
      isValid = validateShippingForm();
    } else if (activeStep === 1) {
      isValid = validatePaymentForm();
    } else {
      isValid = true;
    }
    
    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  
  // Handle back step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  // Handle order submission
  const handlePlaceOrder = async () => {
    setProcessingOrder(true);
    
    try {
      // In a real app, this would be an API call
      // const response = await axios.post('/api/orders', {
      //   items: cartItems,
      //   shippingInfo,
      //   paymentInfo,
      //   total
      // });
      
      // Mock implementation
      setTimeout(() => {
        // Simulate successful order
        const orderId = Math.floor(Math.random() * 1000000);
        navigate(`/order-confirmation/${orderId}`);
      }, 2000); // Simulate network delay
    } catch (err) {
      setError("Failed to place order. Please try again later.");
      setProcessingOrder(false);
    }
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
          to="/cart"
          sx={{ mt: 2 }}
        >
          Back to Cart
        </Button>
      </Container>
    );
  }
  
  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Your cart is empty. Please add some products before proceeding to checkout.
        </Alert>
        <Button 
          variant="contained" 
          color="primary"
          component={Link}
          to="/products"
          sx={{ mt: 2 }}
        >
          Browse Products
        </Button>
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
        Checkout
      </Typography>
      
      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={4}>
          {/* Checkout Form */}
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
                {/* Shipping Information Step */}
                {activeStep === 0 && (
                  <Box>
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                      Shipping Information
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Please enter your shipping details
                    </Typography>
                    
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="firstName"
                          name="firstName"
                          label="First Name"
                          fullWidth
                          value={shippingInfo.firstName}
                          onChange={handleShippingChange}
                          error={!!formErrors.firstName}
                          helperText={formErrors.firstName}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="lastName"
                          name="lastName"
                          label="Last Name"
                          fullWidth
                          value={shippingInfo.lastName}
                          onChange={handleShippingChange}
                          error={!!formErrors.lastName}
                          helperText={formErrors.lastName}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="email"
                          name="email"
                          label="Email Address"
                          fullWidth
                          value={shippingInfo.email}
                          onChange={handleShippingChange}
                          error={!!formErrors.email}
                          helperText={formErrors.email}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="phone"
                          name="phone"
                          label="Phone Number"
                          fullWidth
                          value={shippingInfo.phone}
                          onChange={handleShippingChange}
                          error={!!formErrors.phone}
                          helperText={formErrors.phone}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="address"
                          name="address"
                          label="Address"
                          fullWidth
                          value={shippingInfo.address}
                          onChange={handleShippingChange}
                          error={!!formErrors.address}
                          helperText={formErrors.address}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="city"
                          name="city"
                          label="City"
                          fullWidth
                          value={shippingInfo.city}
                          onChange={handleShippingChange}
                          error={!!formErrors.city}
                          helperText={formErrors.city}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="state"
                          name="state"
                          label="State/Province/Region"
                          fullWidth
                          value={shippingInfo.state}
                          onChange={handleShippingChange}
                          error={!!formErrors.state}
                          helperText={formErrors.state}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="zipCode"
                          name="zipCode"
                          label="ZIP / Postal Code"
                          fullWidth
                          value={shippingInfo.zipCode}
                          onChange={handleShippingChange}
                          error={!!formErrors.zipCode}
                          helperText={formErrors.zipCode}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="country"
                          name="country"
                          label="Country"
                          fullWidth
                          value={shippingInfo.country}
                          onChange={handleShippingChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="saveInfo"
                              color="primary"
                              checked={shippingInfo.saveInfo}
                              onChange={handleShippingChange}
                            />
                          }
                          label="Save this information for next time"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}
                
                {/* Payment Details Step */}
                {activeStep === 1 && (
                  <Box>
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                      Payment Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Please enter your payment information
                    </Typography>
                    
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="cardName"
                          name="cardName"
                          label="Name on Card"
                          fullWidth
                          value={paymentInfo.cardName}
                          onChange={handlePaymentChange}
                          error={!!formErrors.cardName}
                          helperText={formErrors.cardName}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="cardNumber"
                          name="cardNumber"
                          label="Card Number"
                          fullWidth
                          value={paymentInfo.cardNumber}
                          onChange={handlePaymentChange}
                          error={!!formErrors.cardNumber}
                          helperText={formErrors.cardNumber}
                          placeholder="1234 5678 9012 3456"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="expiryDate"
                          name="expiryDate"
                          label="Expiry Date"
                          fullWidth
                          value={paymentInfo.expiryDate}
                          onChange={handlePaymentChange}
                          error={!!formErrors.expiryDate}
                          helperText={formErrors.expiryDate}
                          placeholder="MM/YY"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="cvv"
                          name="cvv"
                          label="CVV"
                          fullWidth
                          value={paymentInfo.cvv}
                          onChange={handlePaymentChange}
                          error={!!formErrors.cvv}
                          helperText={formErrors.cvv}
                          placeholder="123"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="saveCard"
                              color="primary"
                              checked={paymentInfo.saveCard}
                              onChange={handlePaymentChange}
                            />
                          }
                          label="Save this card for future purchases"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}
                
                {/* Review Order Step */}
                {activeStep === 2 && (
                  <Box>
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                      Review Your Order
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Please review your order details before placing your order
                    </Typography>
                    
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Shipping Information
                      </Typography>
                      <Typography variant="body1">
                        {shippingInfo.firstName} {shippingInfo.lastName}
                      </Typography>
                      <Typography variant="body1">
                        {shippingInfo.address}
                      </Typography>
                      <Typography variant="body1">
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                      </Typography>
                      <Typography variant="body1">
                        {shippingInfo.country}
                      </Typography>
                      <Typography variant="body1">
                        {shippingInfo.email}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 3 }}>
                        {shippingInfo.phone}
                      </Typography>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Typography variant="h6" gutterBottom>
                        Payment Details
                      </Typography>
                      <Typography variant="body1">
                        Card: **** **** **** {paymentInfo.cardNumber.slice(-4)}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 3 }}>
                        Expiry: {paymentInfo.expiryDate}
                      </Typography>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Typography variant="h6" gutterBottom>
                        Order Items
                      </Typography>
                      <List disablePadding>
                        {cartItems.map((item) => (
                          <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
                            <ListItemText
                              primary={item.name}
                              secondary={`Quantity: ${item.quantity}`}
                            />
                            <Typography variant="body2">
                              ${(item.price * item.quantity).toFixed(2)}
                            </Typography>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Box>
                )}
                
                {/* Navigation Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<ArrowBack />}
                    onClick={activeStep === 0 ? () => navigate('/cart') : handleBack}
                  >
                    {activeStep === 0 ? 'Back to Cart' : 'Back'}
                  </Button>
                  
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={processingOrder ? <CircularProgress size={20} color="inherit" /> : <CheckCircle />}
                      onClick={handlePlaceOrder}
                      disabled={processingOrder}
                      sx={{ py: 1.5, px: 4, borderRadius: 2 }}
                    >
                      {processingOrder ? 'Processing...' : 'Place Order'}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<ArrowForward />}
                      onClick={handleNext}
                      sx={{ py: 1.5, px: 4, borderRadius: 2 }}
                    >
                      Next
                    </Button>
                  )}
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
                  {cartItems.map((item) => (
                    <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
                      <ListItemText
                        primary={item.name}
                        secondary={`Quantity: ${item.quantity}`}
                      />
                      <Typography variant="body2">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </ListItem>
                  ))}
                  
                  <Divider sx={{ my: 2 }} />
                  
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
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Checkout;