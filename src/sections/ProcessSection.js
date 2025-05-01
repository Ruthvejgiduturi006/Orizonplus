import { Box, Button, Container, Typography, Grid } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, LocationOn, Phone, Email } from '@mui/icons-material';
import { motion } from 'framer-motion';

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
      <Box sx={{ backgroundColor: '#1c2834', color: 'white', py: 8 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>Orizon+</Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Connecting people with opportunities, revolutionizing the way we work and hire.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Facebook />
                <Twitter />
                <Instagram />
                <LinkedIn />
              </Box>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Quick Links</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>Home</Typography>
              <Typography variant="body2">Browse Jobs</Typography>
              <Typography variant="body2">Post a Job</Typography>
              <Typography variant="body2">About Us</Typography>
              <Typography variant="body2">Contact</Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>For Job Seekers</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>Find Jobs</Typography>
              <Typography variant="body2">Create Profile</Typography>
              <Typography variant="body2">Job Alerts</Typography>
              <Typography variant="body2">Resources</Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Contact Us</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <LocationOn sx={{ mr: 1 }} />
                <Typography variant="body2">123 Innovation Street, Tech City, TC 12345</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Phone sx={{ mr: 1 }} />
                <Typography variant="body2">+1 (555) 123-4567</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Email sx={{ mr: 1 }} />
                <Typography variant="body2">contact@orizonplus.com</Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ borderTop: '1px solid #444', mt: 4, pt: 2, textAlign: 'center' }}>
            <Typography variant="body2">© 2025 Orizon+. All rights reserved.</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 1 }}>
              <Typography variant="body2">Terms of Service</Typography>
              <Typography variant="body2">Privacy Policy</Typography>
              <Typography variant="body2">Cookie Policy</Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
