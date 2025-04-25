import React, { useState, useContext } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Box, 
  Container, 
  Badge, 
  Menu, 
  MenuItem, 
  Avatar, 
  useMediaQuery, 
  useTheme,
  Tooltip
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  ShoppingCart, 
  Person, 
  Home, 
  Category, 
  Info, 
  ContactSupport, 
  ExitToApp, 
  Dashboard, 
  AccountCircle,
  Favorite,
  Notifications
} from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthContext from '../../context/AuthContext';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useContext(AuthContext);
  
  // State for mobile drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // State for user menu
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const userMenuOpen = Boolean(userMenuAnchor);
  
  // Toggle drawer
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };
  
  // Handle user menu
  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };
  
  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };
  
  // Handle logout
  const handleLogout = () => {
    handleUserMenuClose();
    logout();
    navigate('/');
  };
  
  // Navigation items
  const navItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Products', icon: <Category />, path: '/products' },
    { text: 'About', icon: <Info />, path: '/about' },
    { text: 'Contact', icon: <ContactSupport />, path: '/contact' },
  ];
  
  // Check if a path is active
  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') {
      return false;
    }
    return location.pathname.startsWith(path);
  };
  
  // Drawer content
  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
          cuakStore
        </Typography>
        {currentUser ? (
          <Box sx={{ textAlign: 'center', mb: 1 }}>
            <Avatar 
              sx={{ 
                width: 60, 
                height: 60, 
                mx: 'auto', 
                mb: 1,
                bgcolor: theme.palette.primary.main 
              }}
            >
              {currentUser.username?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {currentUser.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentUser.email}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <Button 
              variant="outlined" 
              size="small" 
              component={Link} 
              to="/login"
              sx={{ borderRadius: 2 }}
            >
              Login
            </Button>
            <Button 
              variant="contained" 
              size="small" 
              component={Link} 
              to="/register"
              sx={{ borderRadius: 2 }}
            >
              Register
            </Button>
          </Box>
        )}
      </Box>
      
      <Divider />
      
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={Link} 
            to={item.path}
            selected={isActive(item.path)}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      
      <Divider />
      
      {currentUser && (
        <List>
          <ListItem 
            button 
            component={Link} 
            to="/cart"
            selected={isActive('/cart')}
          >
            <ListItemIcon>
              <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Cart" />
          </ListItem>
          
          <ListItem 
            button 
            component={Link} 
            to="/favorites"
            selected={isActive('/favorites')}
          >
            <ListItemIcon>
              <Favorite />
            </ListItemIcon>
            <ListItemText primary="Favorites" />
          </ListItem>
          
          {(currentUser.roles?.includes('ROLE_ADMIN') || currentUser.roles?.includes('ROLE_OWNER')) && (
            <ListItem 
              button 
              component={Link} 
              to="/admin/dashboard"
              selected={isActive('/admin')}
            >
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Admin Dashboard" />
            </ListItem>
          )}
          
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      )}
    </Box>
  );
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar 
        position="sticky" 
        color="default" 
        elevation={0}
        sx={{ 
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
        }}
        className="glass"
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box 
              component="img" 
              src="/logo.png" 
              alt="cuakStore Logo" 
              sx={{ 
                height: 40, 
                mr: 1,
                display: { xs: 'none', sm: 'block' }
              }} 
            />
            cuakStore
          </Typography>
          
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  color={isActive(item.path) ? 'primary' : 'inherit'}
                  sx={{ 
                    mx: 1,
                    fontWeight: isActive(item.path) ? 'bold' : 'normal',
                    position: 'relative',
                    '&::after': isActive(item.path) ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '20%',
                      width: '60%',
                      height: '2px',
                      bgcolor: 'primary.main'
                    } : {}
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {currentUser ? (
              <>
                <Tooltip title="Cart">
                  <IconButton 
                    color="inherit" 
                    component={Link} 
                    to="/cart"
                    sx={{ ml: 1 }}
                  >
                    <Badge badgeContent={3} color="error">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                </Tooltip>
                
                {!isMobile && (
                  <Tooltip title="Favorites">
                    <IconButton 
                      color="inherit"
                      component={Link}
                      to="/favorites"
                      sx={{ ml: 1 }}
                    >
                      <Badge badgeContent={2} color="primary">
                        <Favorite />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                )}
                
                {!isMobile && (
                  <Tooltip title="Notifications">
                    <IconButton color="inherit" sx={{ ml: 1 }}>
                      <Badge badgeContent={1} color="secondary">
                        <Notifications />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                )}
                
                <Tooltip title="Account">
                  <IconButton
                    onClick={handleUserMenuOpen}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={userMenuOpen ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={userMenuOpen ? 'true' : undefined}
                  >
                    <Avatar 
                      sx={{ 
                        width: 32, 
                        height: 32,
                        bgcolor: theme.palette.primary.main 
                      }}
                    >
                      {currentUser.username?.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                
                <Menu
                  anchorEl={userMenuAnchor}
                  id="account-menu"
                  open={userMenuOpen}
                  onClose={handleUserMenuClose}
                  onClick={handleUserMenuClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                      mt: 1.5,
                      borderRadius: 2,
                      minWidth: 180,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <Box sx={{ px: 2, py: 1, textAlign: 'center' }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {currentUser.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {currentUser.email}
                    </Typography>
                  </Box>
                  
                  <Divider />
                  
                  <MenuItem component={Link} to="/profile">
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    My Profile
                  </MenuItem>
                  
                  <MenuItem component={Link} to="/orders">
                    <ListItemIcon>
                      <ShoppingCart fontSize="small" />
                    </ListItemIcon>
                    My Orders
                  </MenuItem>
                  
                  {(currentUser.roles?.includes('ROLE_ADMIN') || currentUser.roles?.includes('ROLE_OWNER')) && (
                    <MenuItem component={Link} to="/admin/dashboard">
                      <ListItemIcon>
                        <Dashboard fontSize="small" />
                      </ListItemIcon>
                      Admin Dashboard
                    </MenuItem>
                  )}
                  
                  <Divider />
                  
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <ExitToApp fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                {!isMobile && (
                  <>
                    <Button 
                      color="inherit" 
                      component={Link} 
                      to="/login"
                      sx={{ ml: 1 }}
                    >
                      Login
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      component={Link} 
                      to="/register"
                      sx={{ ml: 1, borderRadius: 2 }}
                    >
                      Register
                    </Button>
                  </>
                )}
                {isMobile && (
                  <IconButton 
                    color="inherit" 
                    component={Link} 
                    to="/login"
                    sx={{ ml: 1 }}
                  >
                    <AccountCircle />
                  </IconButton>
                )}
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerContent}
      </Drawer>
      
      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          bgcolor: 'background.default',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background decorations */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(63, 81, 181, 0.05)',
            zIndex: 0
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(245, 0, 87, 0.05)',
            zIndex: 0
          }}
        />
        
        {/* Page content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="page-enter"
        >
          {children}
        </motion.div>
      </Box>
      
      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;