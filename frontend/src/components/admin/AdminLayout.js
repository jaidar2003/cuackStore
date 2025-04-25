import React, { useState } from 'react';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  List, 
  Typography, 
  Divider, 
  IconButton, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Avatar, 
  Menu, 
  MenuItem, 
  Tooltip, 
  useTheme, 
  useMediaQuery,
  Collapse
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ShoppingCart as OrdersIcon,
  Inventory as ProductsIcon,
  Category as CategoriesIcon,
  People as UsersIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  AccountCircle
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Drawer width
const drawerWidth = 240;

const AdminLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  
  // State for drawer open/close
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  
  // State for user menu
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  
  // State for submenu open/close
  const [productSubmenuOpen, setProductSubmenuOpen] = useState(
    location.pathname.includes('/admin/products') || 
    location.pathname.includes('/admin/categories')
  );
  
  // Handle drawer toggle
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  // Handle user menu open
  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };
  
  // Handle user menu close
  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };
  
  // Handle logout
  const handleLogout = () => {
    // In a real app, this would clear the auth token and redirect to login
    handleUserMenuClose();
    navigate('/login');
  };
  
  // Handle product submenu toggle
  const handleProductSubmenuToggle = () => {
    setProductSubmenuOpen(!productSubmenuOpen);
  };
  
  // Check if a menu item is active
  const isMenuItemActive = (path) => {
    return location.pathname === path;
  };
  
  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };
  
  // Drawer content
  const drawerContent = (
    <>
      <Toolbar sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        px: [1]
      }}>
        <Typography variant="h6" noWrap component="div" fontWeight="bold">
          cuakStore Admin
        </Typography>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeft />
          </IconButton>
        )}
      </Toolbar>
      <Divider />
      <List component="nav">
        {/* Dashboard */}
        <ListItem 
          button 
          component={Link} 
          to="/admin/dashboard"
          selected={isMenuItemActive('/admin/dashboard')}
          sx={{ 
            borderRadius: 2, 
            mx: 1, 
            mb: 0.5,
            '&.Mui-selected': {
              bgcolor: 'primary.main',
              color: 'white',
              '& .MuiListItemIcon-root': {
                color: 'white'
              }
            }
          }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        
        {/* Orders */}
        <ListItem 
          button 
          component={Link} 
          to="/admin/orders"
          selected={isMenuItemActive('/admin/orders')}
          sx={{ 
            borderRadius: 2, 
            mx: 1, 
            mb: 0.5,
            '&.Mui-selected': {
              bgcolor: 'primary.main',
              color: 'white',
              '& .MuiListItemIcon-root': {
                color: 'white'
              }
            }
          }}
        >
          <ListItemIcon>
            <OrdersIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
        
        {/* Products & Categories */}
        <ListItem 
          button 
          onClick={handleProductSubmenuToggle}
          sx={{ 
            borderRadius: 2, 
            mx: 1, 
            mb: 0.5
          }}
        >
          <ListItemIcon>
            <ProductsIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
          {productSubmenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        
        <Collapse in={productSubmenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem 
              button 
              component={Link} 
              to="/admin/products"
              selected={isMenuItemActive('/admin/products')}
              sx={{ 
                pl: 4,
                borderRadius: 2, 
                mx: 1, 
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white'
                  }
                }
              }}
            >
              <ListItemIcon>
                <ProductsIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Products" />
            </ListItem>
            
            <ListItem 
              button 
              component={Link} 
              to="/admin/categories"
              selected={isMenuItemActive('/admin/categories')}
              sx={{ 
                pl: 4,
                borderRadius: 2, 
                mx: 1, 
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white'
                  }
                }
              }}
            >
              <ListItemIcon>
                <CategoriesIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Categories" />
            </ListItem>
          </List>
        </Collapse>
        
        {/* Users */}
        <ListItem 
          button 
          component={Link} 
          to="/admin/users"
          selected={isMenuItemActive('/admin/users')}
          sx={{ 
            borderRadius: 2, 
            mx: 1, 
            mb: 0.5,
            '&.Mui-selected': {
              bgcolor: 'primary.main',
              color: 'white',
              '& .MuiListItemIcon-root': {
                color: 'white'
              }
            }
          }}
        >
          <ListItemIcon>
            <UsersIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        
        {/* Settings */}
        <ListItem 
          button 
          component={Link} 
          to="/admin/settings"
          selected={isMenuItemActive('/admin/settings')}
          sx={{ 
            borderRadius: 2, 
            mx: 1, 
            mb: 0.5,
            '&.Mui-selected': {
              bgcolor: 'primary.main',
              color: 'white',
              '& .MuiListItemIcon-root': {
                color: 'white'
              }
            }
          }}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </>
  );
  
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 1
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleUserMenuOpen}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={Boolean(userMenuAnchor) ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(userMenuAnchor) ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>A</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          
          <Menu
            anchorEl={userMenuAnchor}
            id="account-menu"
            open={Boolean(userMenuAnchor)}
            onClose={handleUserMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleUserMenuClose}>
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              My Account
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      {/* Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={drawerOpen}
        onClose={isMobile ? handleDrawerToggle : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            bgcolor: 'background.default'
          },
        }}
      >
        {drawerContent}
      </Drawer>
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: 'background.default',
          minHeight: '100vh'
        }}
      >
        <Toolbar /> {/* Spacer for AppBar */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          {children}
        </motion.div>
      </Box>
    </Box>
  );
};

export default AdminLayout;