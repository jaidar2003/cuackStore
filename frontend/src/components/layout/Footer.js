import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Send as SendIcon
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  const currentYear = new Date().getFullYear();
  
  // Footer links
  const footerLinks = {
    shop: [
      { title: 'All Products', path: '/products' },
      { title: '3D Prints', path: '/products?category=3d-prints' },
      { title: 'T-Shirts', path: '/products?category=t-shirts' },
      { title: 'Custom Designs', path: '/products?category=custom-designs' }
    ],
    company: [
      { title: 'About Us', path: '/about' },
      { title: 'Contact', path: '/contact' },
      { title: 'Blog', path: '/blog' },
      { title: 'Careers', path: '/careers' }
    ],
    support: [
      { title: 'FAQ', path: '/faq' },
      { title: 'Shipping & Returns', path: '/shipping' },
      { title: 'Privacy Policy', path: '/privacy' },
      { title: 'Terms of Service', path: '/terms' }
    ]
  };
  
  // Social media links
  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com', name: 'Facebook' },
    { icon: <TwitterIcon />, url: 'https://twitter.com', name: 'Twitter' },
    { icon: <InstagramIcon />, url: 'https://instagram.com', name: 'Instagram' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com', name: 'LinkedIn' }
  ];
  
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'primary.main',
                textDecoration: 'none',
                display: 'inline-block',
                mb: 2
              }}
            >
              cuakStore
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              We specialize in 3D printed products, custom designs, and printed merchandise.
              Our mission is to bring your creative ideas to life with quality craftsmanship.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.name}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  color="primary"
                  size="small"
                  sx={{
                    '&:hover': {
                      bgcolor: 'rgba(63, 81, 181, 0.08)'
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
          
          {/* Quick Links */}
          {!isSmall && (
            <>
              <Grid item xs={12} sm={4} md={2}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Shop
                </Typography>
                <List dense disablePadding>
                  {footerLinks.shop.map((link) => (
                    <ListItem 
                      key={link.title} 
                      disablePadding 
                      sx={{ pb: 0.5 }}
                    >
                      <ListItemText 
                        primary={
                          <Link 
                            to={link.path} 
                            style={{ 
                              color: 'inherit', 
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline',
                                color: theme.palette.primary.main
                              }
                            }}
                          >
                            {link.title}
                          </Link>
                        } 
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              
              <Grid item xs={12} sm={4} md={2}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Company
                </Typography>
                <List dense disablePadding>
                  {footerLinks.company.map((link) => (
                    <ListItem 
                      key={link.title} 
                      disablePadding 
                      sx={{ pb: 0.5 }}
                    >
                      <ListItemText 
                        primary={
                          <Link 
                            to={link.path} 
                            style={{ 
                              color: 'inherit', 
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline',
                                color: theme.palette.primary.main
                              }
                            }}
                          >
                            {link.title}
                          </Link>
                        } 
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              
              <Grid item xs={12} sm={4} md={2}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Support
                </Typography>
                <List dense disablePadding>
                  {footerLinks.support.map((link) => (
                    <ListItem 
                      key={link.title} 
                      disablePadding 
                      sx={{ pb: 0.5 }}
                    >
                      <ListItemText 
                        primary={
                          <Link 
                            to={link.path} 
                            style={{ 
                              color: 'inherit', 
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline',
                                color: theme.palette.primary.main
                              }
                            }}
                          >
                            {link.title}
                          </Link>
                        } 
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </>
          )}
          
          {/* Newsletter and Contact */}
          <Grid item xs={12} md={isSmall ? 12 : 2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Subscribe to get special offers and updates.
            </Typography>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <TextField
                size="small"
                placeholder="Your email"
                variant="outlined"
                sx={{ flexGrow: 1, mr: 1 }}
              />
              <Button 
                variant="contained" 
                color="primary"
                aria-label="subscribe"
                sx={{ minWidth: 'auto' }}
              >
                <SendIcon />
              </Button>
            </Box>
            
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mt: 3 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                info@cuakstore.com
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                +1 (555) 123-4567
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
              <LocationIcon fontSize="small" sx={{ mr: 1, mt: 0.5, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                123 Main Street, Anytown, USA 12345
              </Typography>
            </Box>
          </Grid>
          
          {/* Mobile Links Accordion */}
          {isSmall && (
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Shop
                  </Typography>
                  <List dense disablePadding>
                    {footerLinks.shop.map((link) => (
                      <ListItem 
                        key={link.title} 
                        disablePadding 
                        sx={{ pb: 0.5 }}
                      >
                        <ListItemText 
                          primary={
                            <Link 
                              to={link.path} 
                              style={{ 
                                color: 'inherit', 
                                textDecoration: 'none',
                                fontSize: '0.8rem'
                              }}
                            >
                              {link.title}
                            </Link>
                          } 
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Company
                  </Typography>
                  <List dense disablePadding>
                    {footerLinks.company.map((link) => (
                      <ListItem 
                        key={link.title} 
                        disablePadding 
                        sx={{ pb: 0.5 }}
                      >
                        <ListItemText 
                          primary={
                            <Link 
                              to={link.path} 
                              style={{ 
                                color: 'inherit', 
                                textDecoration: 'none',
                                fontSize: '0.8rem'
                              }}
                            >
                              {link.title}
                            </Link>
                          } 
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Support
                  </Typography>
                  <List dense disablePadding>
                    {footerLinks.support.map((link) => (
                      <ListItem 
                        key={link.title} 
                        disablePadding 
                        sx={{ pb: 0.5 }}
                      >
                        <ListItemText 
                          primary={
                            <Link 
                              to={link.path} 
                              style={{ 
                                color: 'inherit', 
                                textDecoration: 'none',
                                fontSize: '0.8rem'
                              }}
                            >
                              {link.title}
                            </Link>
                          } 
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
        
        {/* Copyright */}
        <Divider sx={{ mt: 6, mb: 4 }} />
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'center' : 'flex-start' }}>
          <Typography variant="body2" color="text.secondary" align={isMobile ? 'center' : 'left'}>
            © {currentYear} cuakStore. All rights reserved.
          </Typography>
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>
                <Typography variant="body2" color="text.secondary">
                  Privacy Policy
                </Typography>
              </Link>
              <Link to="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>
                <Typography variant="body2" color="text.secondary">
                  Terms of Service
                </Typography>
              </Link>
              <Link to="/cookies" style={{ color: 'inherit', textDecoration: 'none' }}>
                <Typography variant="body2" color="text.secondary">
                  Cookie Policy
                </Typography>
              </Link>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;