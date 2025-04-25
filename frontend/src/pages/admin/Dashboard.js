import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Button, 
  Divider, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  IconButton, 
  Chip, 
  CircularProgress, 
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  ShoppingCart, 
  People, 
  Inventory, 
  Category, 
  AttachMoney, 
  Add, 
  Edit, 
  Refresh
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock data for dashboard
const mockData = {
  stats: {
    totalSales: 12580.45,
    totalOrders: 156,
    totalProducts: 48,
    totalUsers: 237,
    pendingOrders: 12,
    lowStockProducts: 5
  },
  recentOrders: [
    { id: 12345, customer: 'John Doe', date: '2023-06-15T14:30:00', total: 129.99, status: 'Delivered' },
    { id: 12346, customer: 'Jane Smith', date: '2023-06-15T10:15:00', total: 79.50, status: 'Processing' },
    { id: 12347, customer: 'Robert Johnson', date: '2023-06-14T16:45:00', total: 249.99, status: 'Shipped' }
  ],
  topProducts: [
    { id: 1, name: 'Custom 3D Printed Vase', sales: 42, revenue: 1259.58 },
    { id: 2, name: 'Graphic Design T-Shirt', sales: 38, revenue: 949.62 },
    { id: 3, name: '3D Printed Planter', sales: 35, revenue: 979.65 }
  ]
};

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
  // Load dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Mock implementation
        setTimeout(() => {
          setData(mockData);
          setLoading(false);
        }, 800); // Simulate network delay
      } catch (err) {
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Mock implementation
      setTimeout(() => {
        // Update some values to simulate fresh data
        const updatedData = {
          ...mockData,
          stats: {
            ...mockData.stats,
            totalOrders: mockData.stats.totalOrders + 2,
            pendingOrders: mockData.stats.pendingOrders + 1
          }
        };
        setData(updatedData);
        setRefreshing(false);
      }, 800); // Simulate network delay
    } catch (err) {
      setError("Failed to refresh dashboard data. Please try again later.");
      setRefreshing(false);
    }
  };
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
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
          variant="contained" 
          color="primary"
          onClick={handleRefresh}
          sx={{ mt: 2 }}
        >
          Try Again
        </Button>
      </Container>
    );
  }
  
  if (!data) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          No dashboard data available.
        </Alert>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleRefresh}
          sx={{ mt: 2 }}
        >
          Refresh
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <motion.div variants={itemVariants}>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Welcome back, Admin! Here's what's happening with your store today.
            </Typography>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Refresh />}
              onClick={handleRefresh}
              disabled={refreshing}
              sx={{ borderRadius: 2 }}
            >
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </motion.div>
        </Box>
        
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
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
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                className="glass"
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" color="text.secondary">
                    Total Sales
                  </Typography>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <AttachMoney />
                  </Avatar>
                </Box>
                <Typography variant="h4" component="div" fontWeight="bold">
                  {formatCurrency(data.stats.totalSales)}
                </Typography>
                <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                  +12.5% from last month
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
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
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                className="glass"
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" color="text.secondary">
                    Total Orders
                  </Typography>
                  <Avatar sx={{ bgcolor: 'info.main' }}>
                    <ShoppingCart />
                  </Avatar>
                </Box>
                <Typography variant="h4" component="div" fontWeight="bold">
                  {data.stats.totalOrders}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Chip 
                    label={`${data.stats.pendingOrders} pending`} 
                    color="warning" 
                    size="small" 
                    sx={{ mr: 1 }} 
                  />
                  <Typography variant="body2" color="text.secondary">
                    needs attention
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
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
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                className="glass"
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" color="text.secondary">
                    Products
                  </Typography>
                  <Avatar sx={{ bgcolor: 'success.main' }}>
                    <Inventory />
                  </Avatar>
                </Box>
                <Typography variant="h4" component="div" fontWeight="bold">
                  {data.stats.totalProducts}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Chip 
                    label={`${data.stats.lowStockProducts} low stock`} 
                    color="error" 
                    size="small" 
                    sx={{ mr: 1 }} 
                  />
                  <Typography variant="body2" color="text.secondary">
                    needs restock
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
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
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                className="glass"
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" color="text.secondary">
                    Customers
                  </Typography>
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    <People />
                  </Avatar>
                </Box>
                <Typography variant="h4" component="div" fontWeight="bold">
                  {data.stats.totalUsers}
                </Typography>
                <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                  +8.2% from last month
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
        
        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              component={Link}
              to="/admin/products/new"
              sx={{ borderRadius: 2 }}
            >
              Add Product
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Category />}
              component={Link}
              to="/admin/categories"
              sx={{ borderRadius: 2 }}
            >
              Manage Categories
            </Button>
            <Button
              variant="contained"
              color="info"
              startIcon={<ShoppingCart />}
              component={Link}
              to="/admin/orders"
              sx={{ borderRadius: 2 }}
            >
              View Orders
            </Button>
          </Box>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default Dashboard;