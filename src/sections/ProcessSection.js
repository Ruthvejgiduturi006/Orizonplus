import { Box, Button, Container, Typography, Grid , Link as MuiLink  } from '@mui/material';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, LinkedIn, LocationOn, Phone, Email } from '@mui/icons-material';
import { Link } from 'react-router-dom'; // if you're using react-router

export default function ProcessSection() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          py: 12,
          color: 'white',
          background: 'linear-gradient(rgba(9, 198, 255, 0.9), rgba(211, 218, 240, 0.9)), url("/public/logo.png") center/cover no-repeat',
          textAlign: 'center',
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
              Start Your Journey with
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#03045E', mb: 4 }}>
              Orizon+ Today
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
          >
            <Typography variant="h6" sx={{ maxWidth: 600, mx: 'auto', mb: 5 }}>
              Whether you're looking for flexible work opportunities or need to hire talent,
              Orizon+ connects you with the right people at the right time.
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button variant="contained" sx={{ bgcolor: '#2196f3', color: 'white', px: 4, py: 1.5, fontWeight: 600, borderRadius: 2 }}>
                Sign Up Now
              </Button>
              <Button variant="outlined" sx={{ color: 'white', borderColor: 'white', px: 4, py: 1.5, fontWeight: 600, borderRadius: 2 }}>
                Contact Us
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Footer Section */}
      <Container>
        <Grid container spacing={4}>
          {/* Orizon+ Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#007acc' }}>
              Orizon+
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Connecting people with opportunities — revolutionizing how we work and hire.
            </Typography>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#007acc' }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <LocationOn sx={{ mr: 1 }} />
              <Typography variant="body2">
                CMR College of Engineering and Technology, Hyderabad
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Email sx={{ mr: 1 }} />
              <Typography variant="body2">contact@orizonplus.site</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Email sx={{ mr: 1 }} />
              <Typography variant="body2">help@orizonplus.site</Typography>
            </Box>
          </Grid>

          {/* Legal Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#007acc' }}>
              Legal
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <MuiLink component={Link} to="/terms" color="inherit" underline="hover">
                Terms of Service
              </MuiLink>
              <MuiLink component={Link} to="/privacy" color="inherit" underline="hover">
                Privacy Policy
              </MuiLink>
              <MuiLink component={Link} to="/cookies" color="inherit" underline="hover">
                Cookie Policy
              </MuiLink>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Note */}
        <Box sx={{ borderTop: '1px solid #b3d7f2', mt: 4, pt: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#1a3d5c' }}>
            © 2025 Orizon+. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
