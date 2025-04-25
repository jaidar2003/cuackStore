import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button, 
  IconButton, 
  Chip, 
  Rating, 
  TextField, 
  InputAdornment, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Select, 
  Pagination, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Slider, 
  Divider, 
  CircularProgress, 
  Alert,
  useMediaQuery,
  useTheme,
  Paper
} from '@mui/material';
import { 
  Search, 
  FilterList, 
  ShoppingCart, 
  Favorite, 
  FavoriteBorder, 
  Sort, 
  Close 
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock data for products (will be replaced with API calls)
const mockProducts = [
  {
    id: 1,
    name: "Custom 3D Printed Vase",
    description: "Elegant geometric vase perfect for modern home decor",
    price: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1578500351865-fa9998d46d97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
    category: "3D Prints"
  },
  {
    id: 2,
    name: "Personalized Phone Stand",
    description: "Custom designed phone stand with your name or logo",
    price: 19.99,
    imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    rating: 4.2,
    category: "Custom Designs"
  },
  {
    id: 3,
    name: "Graphic Design T-Shirt",
    description: "Premium quality t-shirt with unique artistic print",
    price: 24.99,
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    category: "T-Shirts"
  },
  {
    id: 4,
    name: "3D Printed Desk Organizer",
    description: "Functional and stylish desk organizer for your workspace",
    price: 34.99,
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    category: "3D Prints"
  },
  {
    id: 5,
    name: "Custom Logo Keychain",
    description: "Personalized keychain with your logo or design",
    price: 12.99,
    imageUrl: "https://images.unsplash.com/photo-1614094082869-cd4e4b2905c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    rating: 4.3,
    category: "Custom Designs"
  },
  {
    id: 6,
    name: "Minimalist T-Shirt",
    description: "Clean and simple design on a high-quality cotton t-shirt",
    price: 22.99,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    category: "T-Shirts"
  },
  {
    id: 7,
    name: "3D Printed Planter",
    description: "Modern geometric planter for small plants and succulents",
    price: 27.99,
    imageUrl: "https://images.unsplash.com/photo-1558603668-6570496b66f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    rating: 4.4,
    category: "3D Prints"
  },
  {
    id: 8,
    name: "Custom Name Bracelet",
    description: "Personalized bracelet with your name or message",
    price: 18.99,
    imageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    category: "Custom Designs"
  }
];

// Mock data for categories
const categories = [
  { id: 1, name: "All Categories", count: 105 },
  { id: 2, name: "3D Prints", count: 42 },
  { id: 3, name: "Custom Designs", count: 28 },
  { id: 4, name: "T-Shirts", count: 35 }
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" }
];

const ProductList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get query parameters
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  const searchParam = queryParams.get('search');
  const sortParam = queryParams.get('sort') || 'newest';
  const pageParam = parseInt(queryParams.get('page') || '1', 10);
  
  // State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: categoryParam || "All Categories",
    search: searchParam || "",
    sort: sortParam,
    priceRange: [0, 100],
    rating: 0,
    page: pageParam
  });
  
  // Pagination
  const productsPerPage = 8;
  const [totalPages, setTotalPages] = useState(1);
  
  // Load products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await axios.get('/api/products', { params: filters });
        // setProducts(response.data.products);
        // setTotalPages(Math.ceil(response.data.total / productsPerPage));
        
        // Mock implementation
        setTimeout(() => {
          let filteredProducts = [...mockProducts];
          
          // Apply category filter
          if (filters.category !== "All Categories") {
            filteredProducts = filteredProducts.filter(
              product => product.category === filters.category
            );
          }
          
          // Apply search filter
          if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filteredProducts = filteredProducts.filter(
              product => 
                product.name.toLowerCase().includes(searchLower) || 
                product.description.toLowerCase().includes(searchLower)
            );
          }
          
          // Apply price range filter
          filteredProducts = filteredProducts.filter(
            product => 
              product.price >= filters.priceRange[0] && 
              product.price <= filters.priceRange[1]
          );
          
          // Apply rating filter
          if (filters.rating > 0) {
            filteredProducts = filteredProducts.filter(
              product => product.rating >= filters.rating
            );
          }
          
          // Apply sorting
          switch (filters.sort) {
            case 'price_low':
              filteredProducts.sort((a, b) => a.price - b.price);
              break;
            case 'price_high':
              filteredProducts.sort((a, b) => b.price - a.price);
              break;
            case 'rating':
              filteredProducts.sort((a, b) => b.rating - a.rating);
              break;
            case 'newest':
            default:
              // Assuming id represents the order of creation (newer items have higher ids)
              filteredProducts.sort((a, b) => b.id - a.id);
              break;
          }
          
          // Calculate total pages
          const total = filteredProducts.length;
          setTotalPages(Math.ceil(total / productsPerPage));
          
          // Apply pagination
          const startIndex = (filters.page - 1) * productsPerPage;
          const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
          
          setProducts(paginatedProducts);
          setLoading(false);
        }, 800); // Simulate network delay
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [filters]);
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.category !== "All Categories") {
      params.set('category', filters.category);
    }
    
    if (filters.search) {
      params.set('search', filters.search);
    }
    
    if (filters.sort !== 'newest') {
      params.set('sort', filters.sort);
    }
    
    if (filters.page > 1) {
      params.set('page', filters.page.toString());
    }
    
    const newUrl = `${location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    navigate(newUrl, { replace: true });
  }, [filters, location.pathname, navigate]);
  
  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
      // Reset to page 1 when filters change (except when changing page)
      ...(name !== 'page' && { page: 1 })
    }));
  };
  
  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleFilterChange('search', filters.search);
  };
  
  // Toggle favorite status
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
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
  
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          fontWeight="bold"
          className="text-gradient"
        >
          Our Products
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Browse our collection of custom 3D prints, unique designs, and premium quality apparel
        </Typography>
      </Box>
      
      {/* Filters and Search */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Box component="form" onSubmit={handleSearchSubmit}>
            <TextField
              fullWidth
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button 
                      type="submit" 
                      variant="contained" 
                      color="primary"
                      sx={{ borderRadius: 2 }}
                    >
                      Search
                    </Button>
                  </InputAdornment>
                ),
                sx: { borderRadius: 2, pr: 0.5 }
              }}
            />
          </Box>
        </Grid>
        
        <Grid item xs={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            startIcon={<FilterList />}
            onClick={() => setFilterDrawerOpen(true)}
            sx={{ 
              height: '100%', 
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'flex-start'
            }}
          >
            Filters
          </Button>
        </Grid>
        
        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              id="sort-select"
              value={filters.sort}
              label="Sort By"
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <Sort />
                </InputAdornment>
              }
              sx={{ borderRadius: 2 }}
            >
              {sortOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      
      {/* Active Filters */}
      {(filters.category !== "All Categories" || filters.rating > 0 || 
        filters.priceRange[0] > 0 || filters.priceRange[1] < 100) && (
        <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
            Active Filters:
          </Typography>
          
          {filters.category !== "All Categories" && (
            <Chip 
              label={`Category: ${filters.category}`} 
              onDelete={() => handleFilterChange('category', 'All Categories')}
              color="primary"
              variant="outlined"
              size="small"
            />
          )}
          
          {filters.rating > 0 && (
            <Chip 
              label={`Rating: ${filters.rating}+ ★`} 
              onDelete={() => handleFilterChange('rating', 0)}
              color="primary"
              variant="outlined"
              size="small"
            />
          )}
          
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 100) && (
            <Chip 
              label={`Price: $${filters.priceRange[0]} - $${filters.priceRange[1]}`} 
              onDelete={() => handleFilterChange('priceRange', [0, 100])}
              color="primary"
              variant="outlined"
              size="small"
            />
          )}
          
          <Button 
            size="small" 
            onClick={() => {
              setFilters({
                category: "All Categories",
                search: "",
                sort: "newest",
                priceRange: [0, 100],
                rating: 0,
                page: 1
              });
            }}
            sx={{ ml: 'auto' }}
          >
            Clear All
          </Button>
        </Box>
      )}
      
      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {/* Products Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} />
        </Box>
      ) : products.length === 0 ? (
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
            my: 4
          }}
          className="glass"
        >
          <Typography variant="h5" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Try adjusting your filters or search criteria
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              setFilters({
                category: "All Categories",
                search: "",
                sort: "newest",
                priceRange: [0, 100],
                rating: 0,
                page: 1
              });
            }}
          >
            Clear Filters
          </Button>
        </Paper>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <motion.div variants={itemVariants}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
                      }
                    }}
                    className="hover-card"
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={product.imageUrl}
                        alt={product.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      <Box 
                        sx={{ 
                          position: 'absolute', 
                          top: 10, 
                          right: 10,
                          zIndex: 1
                        }}
                      >
                        <IconButton 
                          aria-label="add to favorites"
                          onClick={() => toggleFavorite(product.id)}
                          sx={{ 
                            bgcolor: 'white',
                            '&:hover': {
                              bgcolor: 'rgba(255, 255, 255, 0.9)'
                            }
                          }}
                        >
                          {favorites.includes(product.id) ? 
                            <Favorite color="error" /> : 
                            <FavoriteBorder />
                          }
                        </IconButton>
                      </Box>
                      <Chip 
                        label={product.category} 
                        size="small" 
                        color="primary" 
                        sx={{ 
                          position: 'absolute', 
                          bottom: 10, 
                          left: 10,
                          fontWeight: 'bold'
                        }} 
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {product.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Rating value={product.rating} precision={0.5} size="small" readOnly />
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
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        startIcon={<ShoppingCart />}
                        component={Link}
                        to={`/products/${product.id}`}
                        sx={{ borderRadius: 2 }}
                      >
                        Add to Cart
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      )}
      
      {/* Pagination */}
      {!loading && products.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Pagination 
            count={totalPages} 
            page={filters.page} 
            onChange={(e, value) => handleFilterChange('page', value)}
            color="primary"
            size={isMobile ? "small" : "large"}
            showFirstButton
            showLastButton
          />
        </Box>
      )}
      
      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
      >
        <Box
          sx={{ width: 300, p: 3 }}
          role="presentation"
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Filters
            </Typography>
            <IconButton onClick={() => setFilterDrawerOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Categories
          </Typography>
          <List>
            {categories.map((category) => (
              <ListItem 
                button 
                key={category.id}
                selected={filters.category === category.name}
                onClick={() => {
                  handleFilterChange('category', category.name);
                  if (isMobile) setFilterDrawerOpen(false);
                }}
              >
                <ListItemText 
                  primary={category.name} 
                  secondary={`${category.count} products`} 
                />
              </ListItem>
            ))}
          </List>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Price Range
          </Typography>
          <Box sx={{ px: 2, mt: 4, mb: 2 }}>
            <Slider
              value={filters.priceRange}
              onChange={(e, newValue) => handleFilterChange('priceRange', newValue)}
              valueLabelDisplay="on"
              valueLabelFormat={(value) => `$${value}`}
              min={0}
              max={100}
              step={5}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                $0
              </Typography>
              <Typography variant="body2" color="text.secondary">
                $100
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Minimum Rating
          </Typography>
          <Box sx={{ px: 2, mt: 2 }}>
            <Rating
              value={filters.rating}
              onChange={(e, newValue) => handleFilterChange('rating', newValue)}
              precision={1}
              size="large"
            />
          </Box>
          
          <Box sx={{ mt: 4 }}>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth
              onClick={() => setFilterDrawerOpen(false)}
              sx={{ mb: 2 }}
            >
              Apply Filters
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              fullWidth
              onClick={() => {
                setFilters({
                  category: "All Categories",
                  search: "",
                  sort: "newest",
                  priceRange: [0, 100],
                  rating: 0,
                  page: 1
                });
                setFilterDrawerOpen(false);
              }}
            >
              Clear All Filters
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Container>
  );
};

export default ProductList;