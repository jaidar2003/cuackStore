import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button, 
  IconButton, 
  Chip, 
  Rating, 
  Divider, 
  TextField, 
  Tab, 
  Tabs, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  CircularProgress, 
  Alert,
  Paper,
  Breadcrumbs,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  ShoppingCart, 
  Favorite, 
  FavoriteBorder, 
  Share, 
  Add, 
  Remove, 
  ArrowBack, 
  NavigateNext 
} from '@mui/icons-material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock data for a single product (will be replaced with API calls)
const mockProducts = [
  {
    id: 1,
    name: "Custom 3D Printed Vase",
    description: "Elegant geometric vase perfect for modern home decor. This beautifully designed vase features a unique geometric pattern that catches the light and creates stunning visual effects. Each vase is carefully 3D printed using high-quality materials for a flawless finish.",
    price: 29.99,
    images: [
      "https://images.unsplash.com/photo-1578500351865-fa9998d46d97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1493552152660-f915ab47ae9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    rating: 4.5,
    reviewCount: 28,
    category: "3D Prints",
    stockQuantity: 15,
    features: [
      "Unique geometric design",
      "High-quality PLA material",
      "Dimensions: 20cm x 10cm",
      "Lightweight and durable",
      "Water-resistant finish"
    ],
    specifications: {
      "Material": "PLA Plastic",
      "Dimensions": "20cm x 10cm",
      "Weight": "250g",
      "Color": "White/Gold",
      "Printing Time": "8 hours"
    },
    relatedProducts: [2, 4, 7]
  },
  {
    id: 2,
    name: "Personalized Phone Stand",
    description: "Custom designed phone stand with your name or logo",
    price: 19.99,
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    ],
    rating: 4.2,
    reviewCount: 15,
    category: "Custom Designs",
    stockQuantity: 25
  },
  {
    id: 4,
    name: "3D Printed Desk Organizer",
    description: "Functional and stylish desk organizer for your workspace",
    price: 34.99,
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    ],
    rating: 4.6,
    reviewCount: 32,
    category: "3D Prints",
    stockQuantity: 8
  },
  {
    id: 7,
    name: "3D Printed Planter",
    description: "Modern geometric planter for small plants and succulents",
    price: 27.99,
    images: [
      "https://images.unsplash.com/photo-1558603668-6570496b66f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    ],
    rating: 4.4,
    reviewCount: 19,
    category: "3D Prints",
    stockQuantity: 12
  }
];

// Mock reviews
const mockReviews = [
  {
    id: 1,
    productId: 1,
    username: "Sarah J.",
    rating: 5,
    date: "2023-05-15",
    title: "Absolutely Beautiful!",
    comment: "This vase is even more stunning in person. The geometric design catches the light beautifully and it's the perfect size for my space. Highly recommend!"
  },
  {
    id: 2,
    productId: 1,
    username: "Michael T.",
    rating: 4,
    date: "2023-04-22",
    title: "Great Quality",
    comment: "Very impressed with the quality of this 3D printed vase. The finish is smooth and it looks much more expensive than it is. Took off one star because shipping was a bit slow."
  },
  {
    id: 3,
    productId: 1,
    username: "Emily R.",
    rating: 5,
    date: "2023-03-10",
    title: "Perfect Gift",
    comment: "Bought this as a housewarming gift and my friend loved it! The design is modern and unique, and it arrived in perfect condition. Will definitely order more items!"
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  
  // Fetch product data
  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await axios.get(`/api/products/${id}`);
        // setProduct(response.data);
        
        // Mock implementation
        setTimeout(() => {
          const foundProduct = mockProducts.find(p => p.id === parseInt(id));
          
          if (foundProduct) {
            setProduct(foundProduct);
            
            // Get related products
            if (foundProduct.relatedProducts && foundProduct.relatedProducts.length > 0) {
              const related = mockProducts.filter(p => 
                foundProduct.relatedProducts.includes(p.id)
              );
              setRelatedProducts(related);
            }
            
            // Get reviews
            const productReviews = mockReviews.filter(r => r.productId === parseInt(id));
            setReviews(productReviews);
            
            setLoading(false);
          } else {
            setError("Product not found");
            setLoading(false);
          }
        }, 800); // Simulate network delay
      } catch (err) {
        setError("Failed to load product. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchProductData();
  }, [id]);
  
  // Handle quantity change
  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(value, product?.stockQuantity || 10));
    setQuantity(newQuantity);
  };
  
  // Toggle favorite
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
          onClick={() => navigate('/products')}
          sx={{ mt: 2 }}
        >
          Back to Products
        </Button>
      </Container>
    );
  }
  
  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Product not found
        </Alert>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBack />} 
          onClick={() => navigate('/products')}
          sx={{ mt: 2 }}
        >
          Back to Products
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs 
        separator={<NavigateNext fontSize="small" />} 
        aria-label="breadcrumb"
        sx={{ mb: 4 }}
      >
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography color="text.secondary">Home</Typography>
        </Link>
        <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography color="text.secondary">Products</Typography>
        </Link>
        <Link to={`/products?category=${product.category}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography color="text.secondary">{product.category}</Typography>
        </Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={product.images[activeImage]}
                  alt={product.name}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    mb: 2
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    display: 'flex',
                    gap: 1
                  }}
                >
                  <IconButton
                    aria-label="add to favorites"
                    onClick={toggleFavorite}
                    sx={{
                      bgcolor: 'white',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.9)'
                      }
                    }}
                  >
                    {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                  </IconButton>
                  <IconButton
                    aria-label="share"
                    sx={{
                      bgcolor: 'white',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.9)'
                      }
                    }}
                  >
                    <Share />
                  </IconButton>
                </Box>
              </Box>
              
              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  {product.images.map((image, index) => (
                    <Box
                      key={index}
                      component="img"
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 1,
                        objectFit: 'cover',
                        cursor: 'pointer',
                        border: index === activeImage ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                      onClick={() => setActiveImage(index)}
                    />
                  ))}
                </Box>
              )}
            </motion.div>
          </Grid>
          
          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Box>
                <Chip 
                  label={product.category} 
                  color="primary" 
                  size="small" 
                  sx={{ mb: 2 }} 
                />
                
                <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                  {product.name}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={product.rating} precision={0.5} readOnly />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    {product.rating} ({product.reviewCount} reviews)
                  </Typography>
                </Box>
                
                <Typography 
                  variant="h5" 
                  color="primary" 
                  fontWeight="bold" 
                  sx={{ mb: 3 }}
                >
                  ${product.price.toFixed(2)}
                </Typography>
                
                <Typography variant="body1" paragraph>
                  {product.description}
                </Typography>
                
                {/* Stock Status */}
                <Box sx={{ mb: 3 }}>
                  {product.stockQuantity > 0 ? (
                    <Chip 
                      label={`In Stock: ${product.stockQuantity} available`} 
                      color="success" 
                      variant="outlined" 
                    />
                  ) : (
                    <Chip 
                      label="Out of Stock" 
                      color="error" 
                      variant="outlined" 
                    />
                  )}
                </Box>
                
                {/* Quantity Selector */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    Quantity:
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton 
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      size="small"
                    >
                      <Remove />
                    </IconButton>
                    <TextField
                      value={quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          handleQuantityChange(value);
                        }
                      }}
                      inputProps={{ 
                        min: 1, 
                        max: product.stockQuantity,
                        style: { textAlign: 'center' }
                      }}
                      sx={{ width: 60, mx: 1 }}
                    />
                    <IconButton 
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= product.stockQuantity}
                      size="small"
                    >
                      <Add />
                    </IconButton>
                  </Box>
                </Box>
                
                {/* Add to Cart Button */}
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<ShoppingCart />}
                  fullWidth
                  disabled={product.stockQuantity === 0}
                  sx={{ 
                    py: 1.5,
                    borderRadius: 2,
                    mb: 3
                  }}
                >
                  {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                
                {/* Features List */}
                {product.features && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Key Features:
                    </Typography>
                    <ul style={{ paddingLeft: '1.5rem' }}>
                      {product.features.map((feature, index) => (
                        <li key={index}>
                          <Typography variant="body2" paragraph={false}>
                            {feature}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </Box>
                )}
              </Box>
            </motion.div>
          </Grid>
        </Grid>
        
        {/* Product Tabs */}
        <Box sx={{ mt: 6 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            variant="scrollable"
            scrollButtons="auto"
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider',
              mb: 3
            }}
          >
            <Tab label="Description" />
            <Tab label="Specifications" />
            <Tab label={`Reviews (${reviews.length})`} />
          </Tabs>
          
          {/* Description Tab */}
          {activeTab === 0 && (
            <Box>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
              {product.features && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Features
                  </Typography>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>
                        <Typography variant="body1">
                          {feature}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Box>
          )}
          
          {/* Specifications Tab */}
          {activeTab === 1 && (
            <Box>
              {product.specifications ? (
                <Grid container spacing={2}>
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <React.Fragment key={index}>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="body1" fontWeight="bold">
                          {key}:
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={9}>
                        <Typography variant="body1">
                          {value}
                        </Typography>
                      </Grid>
                      {index < Object.entries(product.specifications).length - 1 && (
                        <Grid item xs={12}>
                          <Divider sx={{ my: 1 }} />
                        </Grid>
                      )}
                    </React.Fragment>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body1">
                  No specifications available for this product.
                </Typography>
              )}
            </Box>
          )}
          
          {/* Reviews Tab */}
          {activeTab === 2 && (
            <Box>
              {reviews.length > 0 ? (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Rating value={product.rating} precision={0.5} readOnly size="large" />
                    <Typography variant="h6" sx={{ ml: 2 }}>
                      {product.rating} out of 5
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ mb: 3 }} />
                  
                  {reviews.map((review) => (
                    <Paper
                      key={review.id}
                      elevation={0}
                      sx={{
                        p: 3,
                        mb: 3,
                        borderRadius: 2,
                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                      }}
                      className="glass"
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {review.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {review.date}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Rating value={review.rating} readOnly size="small" />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          by {review.username}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body1">
                        {review.comment}
                      </Typography>
                    </Paper>
                  ))}
                </>
              ) : (
                <Typography variant="body1">
                  No reviews yet. Be the first to review this product!
                </Typography>
              )}
              
              <Button 
                variant="outlined" 
                color="primary"
                sx={{ mt: 2 }}
              >
                Write a Review
              </Button>
            </Box>
          )}
        </Box>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Related Products
            </Typography>
            <Divider sx={{ mb: 4 }} />
            
            <Grid container spacing={3}>
              {relatedProducts.map((relatedProduct) => (
                <Grid item xs={12} sm={6} md={4} key={relatedProduct.id}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
                        }
                      }}
                      className="hover-card"
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
                          {relatedProduct.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Rating value={relatedProduct.rating} precision={0.5} size="small" readOnly />
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            ({relatedProduct.reviewCount})
                          </Typography>
                        </Box>
                        <Typography variant="h6" color="primary" fontWeight="bold">
                          ${relatedProduct.price.toFixed(2)}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button 
                          variant="outlined" 
                          color="primary" 
                          fullWidth
                          component={Link}
                          to={`/products/${relatedProduct.id}`}
                          sx={{ borderRadius: 2 }}
                        >
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </motion.div>
    </Container>
  );
};

export default ProductDetail;