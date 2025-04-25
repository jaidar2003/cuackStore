import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Grid,
  Chip,
  Alert,
  CircularProgress,
  Snackbar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Search,
  FilterList,
  Visibility,
  Edit,
  Refresh
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Mock data for orders
const mockOrders = [
  {
    id: 12345,
    user: { id: 1, username: 'johndoe', email: 'john.doe@example.com' },
    orderDate: '2023-06-15T14:30:00',
    status: 'DELIVERED',
    totalAmount: 129.99,
    paymentStatus: 'PAID',
    shippingAddress: '123 Main St, Anytown, CA 12345, USA'
  },
  {
    id: 12346,
    user: { id: 2, username: 'janesmith', email: 'jane.smith@example.com' },
    orderDate: '2023-06-15T10:15:00',
    status: 'PROCESSING',
    totalAmount: 79.50,
    paymentStatus: 'PAID',
    shippingAddress: '456 Oak St, Springfield, IL 67890, USA'
  },
  {
    id: 12347,
    user: { id: 3, username: 'robertjohnson', email: 'robert.johnson@example.com' },
    orderDate: '2023-06-14T16:45:00',
    status: 'SHIPPED',
    totalAmount: 249.99,
    paymentStatus: 'PAID',
    shippingAddress: '789 Pine St, Metropolis, NY 54321, USA'
  },
  {
    id: 12348,
    user: { id: 4, username: 'emilydavis', email: 'emily.davis@example.com' },
    orderDate: '2023-06-14T09:20:00',
    status: 'PENDING',
    totalAmount: 59.95,
    paymentStatus: 'PENDING',
    shippingAddress: '321 Elm St, Smallville, OH 13579, USA'
  },
  {
    id: 12349,
    user: { id: 5, username: 'michaelwilson', email: 'michael.wilson@example.com' },
    orderDate: '2023-06-13T13:10:00',
    status: 'CANCELLED',
    totalAmount: 189.75,
    paymentStatus: 'REFUNDED',
    shippingAddress: '654 Maple St, Bigcity, TX 97531, USA'
  }
];

// Order status options
const orderStatusOptions = [
  { value: 'PENDING', label: 'Pending', color: 'warning' },
  { value: 'PAID', label: 'Paid', color: 'info' },
  { value: 'PROCESSING', label: 'Processing', color: 'info' },
  { value: 'SHIPPED', label: 'Shipped', color: 'primary' },
  { value: 'DELIVERED', label: 'Delivered', color: 'success' },
  { value: 'CANCELLED', label: 'Cancelled', color: 'error' },
  { value: 'REFUNDED', label: 'Refunded', color: 'error' }
];

const OrderManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State for orders data
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for table pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // State for order details dialog
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // State for order status update dialog
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  
  // State for snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Load orders
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // Mock implementation
        setTimeout(() => {
          setOrders(mockOrders);
          setLoading(false);
        }, 800); // Simulate network delay
      } catch (err) {
        setError("Failed to load orders. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);
  
  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };
  
  // Handle status filter
  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
    setPage(0);
  };
  
  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toString().includes(searchTerm) ||
      order.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Handle open order details dialog
  const handleOpenDetailsDialog = (order) => {
    setSelectedOrder(order);
    setDetailsDialogOpen(true);
  };
  
  // Handle close order details dialog
  const handleCloseDetailsDialog = () => {
    setDetailsDialogOpen(false);
    setSelectedOrder(null);
  };
  
  // Handle open status update dialog
  const handleOpenStatusDialog = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setStatusDialogOpen(true);
  };
  
  // Handle close status update dialog
  const handleCloseStatusDialog = () => {
    setStatusDialogOpen(false);
    setSelectedOrder(null);
    setNewStatus('');
  };
  
  // Handle status change
  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };
  
  // Handle update order status
  const handleUpdateStatus = async () => {
    if (!selectedOrder || !newStatus) return;
    
    try {
      // Mock implementation
      setTimeout(() => {
        const updatedOrders = orders.map(order => 
          order.id === selectedOrder.id ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
        
        setSnackbar({
          open: true,
          message: 'Order status updated successfully',
          severity: 'success'
        });
        
        handleCloseStatusDialog();
      }, 800); // Simulate network delay
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to update order status',
        severity: 'error'
      });
    }
  };
  
  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };
  
  // Get status chip color
  const getStatusColor = (status) => {
    const statusOption = orderStatusOptions.find(option => option.value === status);
    return statusOption ? statusOption.color : 'default';
  };
  
  // Get status label
  const getStatusLabel = (status) => {
    const statusOption = orderStatusOptions.find(option => option.value === status);
    return statusOption ? statusOption.label : status;
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
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Try Again
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
              Order Management
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              View and manage customer orders
            </Typography>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Refresh />}
              onClick={() => window.location.reload()}
              sx={{ borderRadius: 2 }}
            >
              Refresh
            </Button>
          </motion.div>
        </Box>
        
        {/* Filters */}
        <motion.div variants={itemVariants}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 4,
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)'
            }}
            className="glass"
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Search Orders"
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search by order ID, customer name, email, or address"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="status-filter-label">Filter by Status</InputLabel>
                  <Select
                    labelId="status-filter-label"
                    value={statusFilter}
                    onChange={handleStatusFilter}
                    label="Filter by Status"
                    startAdornment={
                      <InputAdornment position="start">
                        <FilterList />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="">
                      <em>All Statuses</em>
                    </MenuItem>
                    {orderStatusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
        
        {/* Orders Table */}
        <motion.div variants={itemVariants}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)'
            }}
            className="glass"
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <Typography variant="body1" sx={{ py: 3 }}>
                          No orders found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold">
                              #{order.id}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {order.user.username}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {order.user.email}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {formatDate(order.orderDate)}
                          </TableCell>
                          <TableCell>
                            {formatCurrency(order.totalAmount)}
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={getStatusLabel(order.status)} 
                              color={getStatusColor(order.status)} 
                              size="small" 
                            />
                          </TableCell>
                          <TableCell align="center">
                            <IconButton 
                              color="primary" 
                              onClick={() => handleOpenDetailsDialog(order)}
                              size="small"
                              title="View Details"
                            >
                              <Visibility />
                            </IconButton>
                            <IconButton 
                              color="secondary" 
                              onClick={() => handleOpenStatusDialog(order)}
                              size="small"
                              title="Update Status"
                              disabled={['DELIVERED', 'CANCELLED', 'REFUNDED'].includes(order.status)}
                            >
                              <Edit />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredOrders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </motion.div>
      </motion.div>
      
      {/* Order Details Dialog */}
      <Dialog 
        open={detailsDialogOpen} 
        onClose={handleCloseDetailsDialog}
        fullWidth
        maxWidth="md"
      >
        {selectedOrder && (
          <>
            <DialogTitle>
              Order #{selectedOrder.id} Details
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Order Information
                  </Typography>
                  <Typography variant="body2">
                    <strong>Date:</strong> {formatDate(selectedOrder.orderDate)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Status:</strong> {getStatusLabel(selectedOrder.status)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Payment Status:</strong> {selectedOrder.paymentStatus}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Total Amount:</strong> {formatCurrency(selectedOrder.totalAmount)}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Customer Information
                  </Typography>
                  <Typography variant="body2">
                    <strong>Name:</strong> {selectedOrder.user.username}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Email:</strong> {selectedOrder.user.email}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Shipping Address:</strong> {selectedOrder.shippingAddress}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetailsDialog}>
                Close
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => {
                  handleCloseDetailsDialog();
                  handleOpenStatusDialog(selectedOrder);
                }}
                disabled={['DELIVERED', 'CANCELLED', 'REFUNDED'].includes(selectedOrder.status)}
              >
                Update Status
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      
      {/* Status Update Dialog */}
      <Dialog 
        open={statusDialogOpen} 
        onClose={handleCloseStatusDialog}
        fullWidth
        maxWidth="sm"
      >
        {selectedOrder && (
          <>
            <DialogTitle>
              Update Order Status
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="body1" paragraph>
                Change the status for order #{selectedOrder.id}
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                  labelId="status-select-label"
                  value={newStatus}
                  onChange={handleStatusChange}
                  label="Status"
                >
                  {orderStatusOptions.map((option) => (
                    <MenuItem 
                      key={option.value} 
                      value={option.value}
                      disabled={['DELIVERED', 'CANCELLED', 'REFUNDED'].includes(option.value)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseStatusDialog}>
                Cancel
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleUpdateStatus}
              >
                Update
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default OrderManagement;