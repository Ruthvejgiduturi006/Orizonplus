import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
  };

  return (
    <Box>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ background: '#ffffff', boxShadow: 'none', zIndex: 3 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src="/logo.png" alt="Orizon+ Logo" style={{ height: '40px' }} />
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold', color: '#03045E', cursor: 'pointer' }}
              onClick={() => handleNav('/')}
            >
              Orizon+
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <Button onClick={() => handleNav('/')} sx={navStyle}>Home</Button>
            <Button onClick={() => handleNav('/BrowseJobs')} sx={navStyle}>Find Jobs</Button>
            <Button
  onClick={() => {
    const isLoggedIn = localStorage.getItem('token'); // or use context/state
    if (!isLoggedIn) {
      alert('Please log in first to post a job.');
    } else {
      handleNav('/Login');
    }
  }}
  sx={navStyle}
>
  Post Jobs
</Button>

            <Button onClick={() => handleNav('/about')} sx={navStyle}>About</Button>

            <IconButton sx={iconStyle}>
              <NotificationsIcon />
            </IconButton>

            <Button variant="outlined" sx={loginBtnStyle} onClick={() => handleNav('/Login')}>Log In</Button>
<Button variant="contained" sx={signupBtnStyle} onClick={() => handleNav('/Signup')}>Sign Up</Button>

          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ height: '100vh', position: 'relative', overflow: 'hidden', pt: 8 }}>
        {/* Background Video */}
        <Box
          component="video"
          autoPlay
          loop
          muted
          playsInline
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -2
          }}
        >
          <source src="/video/3209211-uhd_3840_2160_25fps.mp4" type="video/mp4" />
        </Box>

        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(93, 95, 176, 0.6)',
            zIndex: -1
          }}
        />

        {/* Content */}
        <Container
          maxWidth="lg"
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
            color: 'white'
          }}
        >
          <Box>
            <motion.div initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
              <Typography variant="h2" sx={{ fontWeight: 900, fontSize: '3rem', mb: 2 }}>
                Find Local <span style={{ color: '#00B4D8' }}>Part-Time Jobs</span> Near You
              </Typography>
            </motion.div>

            <motion.div initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
              <Typography variant="h6" sx={{ mb: 4, maxWidth: 700, mx: 'auto', color: '#CAF0F8' }}>
                Orizon+ helps you explore short-term work that matches your skills and schedule — easily and locally.
              </Typography>
            </motion.div>

            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button variant="contained" sx={exploreBtnStyle} onClick={() => handleNav('/BrowseJobs')}>
                  Explore Jobs
                </Button>
                <Button variant="contained" sx={postJobBtnStyle} onClick={() => handleNav('/Login')}>
                  Post a Job
                </Button>
              </Box>
            </motion.div>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HeroSection;

// 🔧 Style constants
const navStyle = {
  color: '#0077B6',
  fontWeight: 500,
  '&:hover': { color: '#00B4D8', transform: 'translateY(-2px)' },
  transition: 'all 0.3s ease'
};

const iconStyle = {
  color: '#0077B6',
  '&:hover': { color: '#00B4D8', transform: 'scale(1.1)' },
  transition: '0.3s'
};

const loginBtnStyle = {
  color: '#0077B6',
  borderColor: '#0077B6',
  '&:hover': { backgroundColor: '#0077B6', color: 'white' }
};

const signupBtnStyle = {
  backgroundColor: '#00B4D8',
  '&:hover': { backgroundColor: '#0077B6' }
};

const exploreBtnStyle = {
  backgroundColor: '#03045E',
  color: 'white',
  '&:hover': { backgroundColor: '#0077B6' }
};

const postJobBtnStyle = {
  backgroundColor: '#0077B6',
  '&:hover': { backgroundColor: '#00B4D8' }
};
