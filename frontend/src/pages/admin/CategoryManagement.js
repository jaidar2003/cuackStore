import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  Chip,
  Alert,
  CircularProgress,
  Snackbar,
  Grid,
  Card,
  CardContent,
  CardActions,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Save,
  Cancel,
  Category as CategoryIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Mock data for categories
const mockCategories = [
  { 
    id: 1, 
    name: '3D Prints', 
    description: 'Custom 3D printed items for home decor and practical use.',
    productCount: 15
  },
  { 
    id: 2, 
    name: 'T-Shirts', 
    description: 'Custom designed and printed t-shirts with unique graphics.',
    productCount: 12
  },
  { 
    id: 3, 
    name: 'Mugs', 
    description: 'Personalized mugs with custom designs and photos.',
    productCount: 8
  },
  { 
    id: 4, 
    name: 'Phone Cases', 
    description: 'Durable phone cases with personalized designs for various models.',
    productCount: 7
  },
  { 
    id: 5, 
    name: 'Posters', 
    description: 'High-quality printed posters in various sizes.',
    productCount: 6
  }
];

const CategoryManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State for categories data
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for category dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [currentCategory, setCurrentCategory] = useState({
    name: '',
    description: ''
  });
  const [formErrors, setFormErrors] = useState({});
  
  // State for delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  
  // State for snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await axios.get('/api/categories');
        
        // Mock implementation
        setTimeout(() => {
          setCategories(mockCategories);
          setLoading(false);
        }, 800); // Simulate network delay
      } catch (err) {
        setError("Failed to load categories. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);
  
  // Handle dialog open for adding new category
  const handleAddCategory = () => {
    setDialogMode('add');
    setCurrentCategory({
      name: '',
      description: ''
    });
    setFormErrors({});
    setDialogOpen(true);
  };
  
  // Handle dialog open for editing category
  const handleEditCategory = (category) => {
    setDialogMode('edit');
    setCurrentCategory({...category});
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
    
    setCurrentCategory({
      ...currentCategory,
      [name]: value
    });
    
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
    
    if (!currentCategory.name.trim()) {
      errors.name = 'Category name is required';
    } else if (
      dialogMode === 'add' && 
      categories.some(cat => cat.name.toLowerCase() === currentCategory.name.toLowerCase())
    ) {
      errors.name = 'Category with this name already exists';
    } else if (
      dialogMode === 'edit' && 
      categories.some(cat => 
        cat.id !== currentCategory.id && 
        cat.name.toLowerCase() === currentCategory.name.toLowerCase()
      )
    ) {
      errors.name = 'Category with this name already exists';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle save category
  const handleSaveCategory = async () => {
    if (!validateForm()) return;
    
    try {
      if (dialogMode === 'add') {
        // In a real app, this would be an API call
        // await axios.post('/api/categories', currentCategory);
        
        // Mock implementation
        const newCategory = {
          ...currentCategory,
          id: Math.max(...categories.map(c => c.id)) + 1,
          productCount: 0
        };
        setCategories([...categories, newCategory]);
        
        setSnackbar({
          open: true,
          message: 'Category added successfully',
          severity: 'success'
        });
      } else {
        // In a real app, this would be an API call
        // await axios.put(`/api/categories/${currentCategory.id}`, currentCategory);
        
        // Mock implementation
        const updatedCategories = categories.map(c => 
          c.id === currentCategory.id ? {...currentCategory, productCount: c.productCount} : c
        );
        setCategories(updatedCategories);
        
        setSnackbar({
          open: true,
          message: 'Category updated successfully',
          severity: 'success'
        });
      }
      
      setDialogOpen(false);
    } catch (err) {
      setSnackbar({
        open: true,
        message: `Failed to ${dialogMode === 'add' ? 'add' : 'update'} category`,
        severity: 'error'
      });
    }
  };
  
  // Handle open delete confirmation dialog
  const handleOpenDeleteDialog = (category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };
  
  // Handle close delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };
  
  // Handle delete category
  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;
    
    try {
      // In a real app, this would be an API call
      // await axios.delete(`/api/categories/${categoryToDelete.id}`);
      
      // Mock implementation
      const updatedCategories = categories.filter(c => c.id !== categoryToDelete.id);
      setCategories(updatedCategories);
      
      setSnackbar({
        open: true,
        message: 'Category deleted successfully',
        severity: 'success'
      });
      
      handleCloseDeleteDialog();
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to delete category',
        severity: 'error'
      });
      handleCloseDeleteDialog();
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
              Category Management
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Organize your products with categories
            </Typography>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleAddCategory}
              sx={{ borderRadius: 2 }}
            >
              Add Category
            </Button>
          </motion.div>
        </Box>
        
        {/* Categories Grid */}
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <motion.div variants={itemVariants}>
                <Card
                  elevation={0}
                  sx={{
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
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CategoryIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" component="h2" fontWeight="bold">
                        {category.name}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {category.description}
                    </Typography>
                    
                    <Chip 
                      label={`${category.productCount} products`} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                    />
                  </CardContent>
                  
                  <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
                    <Button
                      size="small"
                      startIcon={<Edit />}
                      onClick={() => handleEditCategory(category)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => handleOpenDeleteDialog(category)}
                      disabled={category.productCount > 0}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
      
      {/* Category Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {dialogMode === 'add' ? 'Add New Category' : 'Edit Category'}
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            label="Category Name"
            name="name"
            value={currentCategory.name}
            onChange={handleInputChange}
            margin="normal"
            error={!!formErrors.name}
            helperText={formErrors.name}
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={currentCategory.description}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} startIcon={<Cancel />}>
            Cancel
          </Button>
          <Button 
            onClick={handleSaveCategory} 
            variant="contained" 
            color="primary"
            startIcon={<Save />}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete the category "{categoryToDelete?.name}"?
          </Typography>
          {categoryToDelete?.productCount > 0 && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              This category has {categoryToDelete.productCount} products. You cannot delete it until you reassign or delete these products.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteCategory} 
            color="error"
            variant="contained"
            disabled={categoryToDelete?.productCount > 0}
          >
            Delete
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

export default CategoryManagement;