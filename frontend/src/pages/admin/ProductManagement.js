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
  Add,
  Edit,
  Delete,
  Search,
  FilterList,
  Image as ImageIcon,
  Save,
  Cancel,
  Refresh
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Mock data for products
const mockProducts = [
  { 
    id: 1, 
    name: 'Custom 3D Printed Vase', 
    description: 'Beautiful custom designed vase, perfect for any home decor.',
    price: 29.99, 
    stockQuantity: 15, 
    category: { id: 1, name: '3D Prints' },
    imageUrl: 'https://images.unsplash.com/photo-1578500351865-fa9998d46d97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
  },
  { 
    id: 2, 
    name: 'Graphic Design T-Shirt', 
    description: 'Comfortable cotton t-shirt with unique graphic design.',
    price: 24.99, 
    stockQuantity: 42, 
    category: { id: 2, name: 'T-Shirts' },
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
  },
  { 
    id: 3, 
    name: '3D Printed Planter', 
    description: 'Modern geometric planter for small plants and succulents.',
    price: 27.99, 
    stockQuantity: 23, 
    category: { id: 1, name: '3D Prints' },
    imageUrl: 'https://images.unsplash.com/photo-1558603668-6570496b66f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
  },
  { 
    id: 4, 
    name: 'Custom Logo Mug', 
    description: 'Ceramic mug with custom printed logo or design.',
    price: 19.99, 
    stockQuantity: 38, 
    category: { id: 3, name: 'Mugs' },
    imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
  },
  { 
    id: 5, 
    name: 'Personalized Phone Case', 
    description: 'Durable phone case with personalized design or photo.',
    price: 19.99, 
    stockQuantity: 52, 
    category: { id: 4, name: 'Phone Cases' },
    imageUrl: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
  }
];

// Mock data for categories
const mockCategories = [
  { id: 1, name: '3D Prints' },
  { id: 2, name: 'T-Shirts' },
  { id: 3, name: 'Mugs' },
  { id: 4, name: 'Phone Cases' },
  { id: 5, name: 'Posters' }
];

const ProductManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State for products data
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for table pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  // State for product dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    category: { id: '', name: '' },
    imageUrl: ''
  });
  const [formErrors, setFormErrors] = useState({});
  
  // State for snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Load products and categories
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, these would be API calls
        // const productsResponse = await axios.get('/api/products');
        // const categoriesResponse = await axios.get('/api/categories');
        
        // Mock implementation
        setTimeout(() => {
          setProducts(mockProducts);
          setCategories(mockCategories);
          setLoading(false);
        }, 800); // Simulate network delay
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchData();
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
  
  // Handle category filter
  const handleCategoryFilter = (event) => {
    setCategoryFilter(event.target.value);
    setPage(0);
  };
  
  // Filter products based on search term and category filter
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || product.category.id.toString() === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  // Handle dialog open for adding new product
  const handleAddProduct = () => {
    setDialogMode('add');
    setCurrentProduct({
      name: '',
      description: '',
      price: '',
      stockQuantity: '',
      category: { id: '', name: '' },
      imageUrl: ''
    });
    setFormErrors({});
    setDialogOpen(true);
  };
  
  // Handle dialog open for editing product
  const handleEditProduct = (product) => {
    setDialogMode('edit');
    setCurrentProduct({...product});
    setFormErrors({});
    setDialogOpen(true);
  };
  
  // Handle dialog close
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  
  // Handle form input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    if (name === 'category') {
      const selectedCategory = categories.find(cat => cat.id.toString() === value);
      setCurrentProduct({
        ...currentProduct,
        category: selectedCategory || { id: '', name: '' }
      });
    } else if (name === 'price' || name === 'stockQuantity') {
      // Only allow numbers and decimal point for price
      if (name === 'price' && !/^\d*\.?\d*$/.test(value)) return;
      // Only allow integers for stock quantity
      if (name === 'stockQuantity' && !/^\d*$/.test(value)) return;
      
      setCurrentProduct({
        ...currentProduct,
        [name]: value
      });
    } else {
      setCurrentProduct({
        ...currentProduct,
        [name]: value
      });
    }
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!currentProduct.name.trim()) {
      errors.name = 'Product name is required';
    }
    
    if (!currentProduct.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (!currentProduct.price) {
      errors.price = 'Price is required';
    } else if (isNaN(parseFloat(currentProduct.price)) || parseFloat(currentProduct.price) <= 0) {
      errors.price = 'Price must be a positive number';
    }
    
    if (!currentProduct.stockQuantity) {
      errors.stockQuantity = 'Stock quantity is required';
    } else if (isNaN(parseInt(currentProduct.stockQuantity)) || parseInt(currentProduct.stockQuantity) < 0) {
      errors.stockQuantity = 'Stock quantity must be a non-negative integer';
    }
    
    if (!currentProduct.category.id) {
      errors.category = 'Category is required';
    }
    
    if (!currentProduct.imageUrl.trim()) {
      errors.imageUrl = 'Image URL is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle save product
  const handleSaveProduct = async () => {
    if (!validateForm()) return;
    
    try {
      if (dialogMode === 'add') {
        // In a real app, this would be an API call
        // await axios.post('/api/products', currentProduct);
        
        // Mock implementation
        const newProduct = {
          ...currentProduct,
          id: Math.max(...products.map(p => p.id)) + 1
        };
        setProducts([...products, newProduct]);
        
        setSnackbar({
          open: true,
          message: 'Product added successfully',
          severity: 'success'
        });
      } else {
        // In a real app, this would be an API call
        // await axios.put(`/api/products/${currentProduct.id}`, currentProduct);
        
        // Mock implementation
        const updatedProducts = products.map(p => 
          p.id === currentProduct.id ? currentProduct : p
        );
        setProducts(updatedProducts);
        
        setSnackbar({
          open: true,
          message: 'Product updated successfully',
          severity: 'success'
        });
      }
      
      setDialogOpen(false);
    } catch (err) {
      setSnackbar({
        open: true,
        message: `Failed to ${dialogMode === 'add' ? 'add' : 'update'} product`,
        severity: 'error'
      });
    }
  };
  
  // Handle delete product
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      // In a real app, this would be an API call
      // await axios.delete(`/api/products/${productId}`);
      
      // Mock implementation
      const updatedProducts = products.filter(p => p.id !== productId);
      setProducts(updatedProducts);
      
      setSnackbar({
        open: true,
        message: 'Product deleted successfully',
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to delete product',
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
              Product Management
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Add, edit, and manage your store's products
            </Typography>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleAddProduct}
              sx={{ borderRadius: 2 }}
            >
              Add Product
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
                  label="Search Products"
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleSearch}
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
                  <InputLabel id="category-filter-label">Filter by Category</InputLabel>
                  <Select
                    labelId="category-filter-label"
                    value={categoryFilter}
                    onChange={handleCategoryFilter}
                    label="Filter by Category"
                    startAdornment={
                      <InputAdornment position="start">
                        <FilterList />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="">
                      <em>All Categories</em>
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
        
        {/* Products Table */}
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
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Stock</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <Typography variant="body1" sx={{ py: 3 }}>
                          No products found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProducts
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            {product.imageUrl ? (
                              <Box
                                component="img"
                                src={product.imageUrl}
                                alt={product.name}
                                sx={{
                                  width: 60,
                                  height: 60,
                                  objectFit: 'cover',
                                  borderRadius: 2
                                }}
                              />
                            ) : (
                              <Box
                                sx={{
                                  width: 60,
                                  height: 60,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  bgcolor: 'grey.200',
                                  borderRadius: 2
                                }}
                              >
                                <ImageIcon color="disabled" />
                              </Box>
                            )}
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 250 }}>
                              {product.description}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={product.category.name} 
                              size="small" 
                              color="primary" 
                              variant="outlined" 
                            />
                          </TableCell>
                          <TableCell align="right">
                            ${product.price.toFixed(2)}
                          </TableCell>
                          <TableCell align="right">
                            <Typography
                              variant="body2"
                              color={product.stockQuantity < 10 ? 'error.main' : 'text.primary'}
                              fontWeight={product.stockQuantity < 10 ? 'bold' : 'normal'}
                            >
                              {product.stockQuantity}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <IconButton 
                              color="primary" 
                              onClick={() => handleEditProduct(product)}
                              size="small"
                            >
                              <Edit />
                            </IconButton>
                            <IconButton 
                              color="error" 
                              onClick={() => handleDeleteProduct(product.id)}
                              size="small"
                            >
                              <Delete />
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
              count={filteredProducts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </motion.div>
      </motion.div>
      
      {/* Product Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleDialogClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {dialogMode === 'add' ? 'Add New Product' : 'Edit Product'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={currentProduct.name}
                onChange={handleInputChange}
                margin="normal"
                error={!!formErrors.name}
                helperText={formErrors.name}
                required
              />
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={currentProduct.price}
                onChange={handleInputChange}
                margin="normal"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                error={!!formErrors.price}
                helperText={formErrors.price}
                required
              />
              <TextField
                fullWidth
                label="Stock Quantity"
                name="stockQuantity"
                value={currentProduct.stockQuantity}
                onChange={handleInputChange}
                margin="normal"
                error={!!formErrors.stockQuantity}
                helperText={formErrors.stockQuantity}
                required
              />
              <FormControl 
                fullWidth 
                margin="normal"
                error={!!formErrors.category}
                required
              >
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={currentProduct.category.id ? currentProduct.category.id.toString() : ''}
                  onChange={handleInputChange}
                  label="Category"
                >
                  <MenuItem value="">
                    <em>Select a category</em>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                {formErrors.category && (
                  <Typography variant="caption" color="error">
                    {formErrors.category}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Image URL"
                name="imageUrl"
                value={currentProduct.imageUrl}
                onChange={handleInputChange}
                margin="normal"
                error={!!formErrors.imageUrl}
                helperText={formErrors.imageUrl}
                required
              />
              {currentProduct.imageUrl && (
                <Box
                  sx={{
                    mt: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 200,
                    bgcolor: 'grey.100',
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    component="img"
                    src={currentProduct.imageUrl}
                    alt="Product preview"
                    sx={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '';
                      e.target.alt = 'Invalid image URL';
                    }}
                  />
                </Box>
              )}
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={currentProduct.description}
                onChange={handleInputChange}
                margin="normal"
                multiline
                rows={4}
                error={!!formErrors.description}
                helperText={formErrors.description}
                required
                sx={{ mt: 2 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} startIcon={<Cancel />}>
            Cancel
          </Button>
          <Button 
            onClick={handleSaveProduct} 
            variant="contained" 
            color="primary"
            startIcon={<Save />}
          >
            Save
          </Button>
        </DialogActions>
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

export default ProductManagement;