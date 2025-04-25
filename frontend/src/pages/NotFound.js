import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowBack } from '@mui/icons-material';

const NotFound = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: 4,
            textAlign: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
          }}
          className="glass"
        >
          <Box
            component="img"
            src="https://illustrations.popsy.co/violet/crashed-error.svg"
            alt="404 Illustration"
            sx={{
              width: '100%',
              maxWidth: 400,
              height: 'auto',
              mb: 4,
              mx: 'auto',
            }}
          />
          
          <Typography
            variant="h1"
            component="h1"
            className="text-gradient"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '3rem', md: '4rem' },
              mb: 2,
            }}
          >
            404
          </Typography>
          
          <Typography
            variant="h4"
            component="h2"
            sx={{ mb: 2, fontWeight: 600 }}
          >
            Page Not Found
          </Typography>
          
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
          >
            Oops! The page you are looking for doesn't exist or has been moved.
            Let's get you back on track.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/"
              startIcon={<Home />}
              sx={{ borderRadius: 2, px: 3 }}
            >
              Back to Home
            </Button>
            
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => window.history.back()}
              startIcon={<ArrowBack />}
              sx={{ borderRadius: 2, px: 3 }}
            >
              Go Back
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default NotFound;