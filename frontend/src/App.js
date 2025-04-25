import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import Layout from './components/layout/Layout';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const ProductList = lazy(() => import('./pages/products/ProductList'));
const ProductDetail = lazy(() => import('./pages/products/ProductDetail'));
const Cart = lazy(() => import('./pages/cart/Cart'));
const Checkout = lazy(() => import('./pages/checkout/Checkout'));
const OrderConfirmation = lazy(() => import('./pages/checkout/OrderConfirmation'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const ProductManagement = lazy(() => import('./pages/admin/ProductManagement'));
const CategoryManagement = lazy(() => import('./pages/admin/CategoryManagement'));
const OrderManagement = lazy(() => import('./pages/admin/OrderManagement'));

// Loading component for suspense fallback
const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress size={60} />
  </Box>
);

// Protected route component
const ProtectedRoute = ({ children, roles = [] }) => {
  const { currentUser, isAuthenticated } = useContext(AuthContext);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (roles.length > 0) {
    const hasRequiredRole = roles.some(role => 
      currentUser.roles?.includes(role)
    );
    
    if (!hasRequiredRole) {
      return <Navigate to="/" replace />;
    }
  }
  
  return children;
};

const App = () => {
  const location = useLocation();
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes for authenticated users */}
            <Route 
              path="/cart" 
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/order-confirmation/:id" 
              element={
                <ProtectedRoute>
                  <OrderConfirmation />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute roles={['ROLE_ADMIN', 'ROLE_OWNER']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/products" 
              element={
                <ProtectedRoute roles={['ROLE_ADMIN', 'ROLE_OWNER']}>
                  <ProductManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/categories" 
              element={
                <ProtectedRoute roles={['ROLE_ADMIN', 'ROLE_OWNER']}>
                  <CategoryManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/orders" 
              element={
                <ProtectedRoute roles={['ROLE_ADMIN', 'ROLE_OWNER']}>
                  <OrderManagement />
                </ProtectedRoute>
              } 
            />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Suspense>
  );
};

export default App;