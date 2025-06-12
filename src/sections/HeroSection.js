import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import PostAddIcon from '@mui/icons-material/PostAdd';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

const HeroSection = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNav = (path) => {
    setDrawerOpen(false);
    navigate(path);
  };

  const navItems = [
    { label: 'Home', icon: <HomeIcon />, path: '/' },
    { label: 'Find Jobs', icon: <WorkIcon />, path: '/browsejobmap' },
    {
      label: 'Post Jobs',
      icon: <PostAddIcon />,
      action: () => {
        const isLoggedIn = localStorage.getItem('token');
        if (!isLoggedIn) alert('Please log in first to post a job.');
        else handleNav('/Login');
      }
    },
    { label: 'About', icon: <InfoIcon />, path: '/about' },
    { label: 'Login', icon: <LoginIcon />, path: '/Login' },
    { label: 'Sign Up', icon: <PersonAddIcon />, path: '/Signup' }
  ];

  return (
    <Box>
      <AppBar position="fixed" sx={{ background: '#ffffff', boxShadow: 'none', zIndex: 3 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo and Title */}
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

          {/* Desktop Nav */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {navItems.slice(0, 4).map((item, i) => (
                <Button
                  key={i}
                  startIcon={item.icon}
                  onClick={() => item.action ? item.action() : handleNav(item.path)}
                  sx={navStyle}
                >
                  {item.label}
                </Button>
              ))}

              <IconButton sx={iconStyle}>
                <NotificationsIcon />
              </IconButton>

              <Button
                startIcon={<LoginIcon />}
                onClick={() => handleNav('/Login')}
                variant="outlined"
                sx={loginBtnStyle}
              >
                Log In
              </Button>
              <Button
                startIcon={<PersonAddIcon />}
                onClick={() => handleNav('/Signup')}
                variant="contained"
                sx={signupBtnStyle}
              >
                Sign Up
              </Button>
            </Box>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#0077B6' }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, mt: 4 }}>
          <List>
            {navItems.map((item, i) => (
              <ListItem
                button
                key={i}
                onClick={() => (item.action ? item.action() : handleNav(item.path))}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Hero Section */}
      <Box sx={{ height: '100vh', position: 'relative', overflow: 'hidden', pt: 10 }}>
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
  <Button
    variant="contained"
    sx={exploreBtnStyle}
    onClick={() => handleNav('/browsejobmap')}
    startIcon={<TravelExploreIcon />} // ← Add Explore icon here
  >
    Explore Jobs
  </Button>

  <Button
    variant="contained"
    sx={postJobBtnStyle}
    onClick={() => handleNav('/Login')}
    startIcon={<WorkOutlineIcon />} // ← Add Post icon here
  >
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

// Styles
const navStyle = {
  color: '#0077B6',
  fontWeight: 500,
  textTransform: 'none',
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
  fontWeight: 600,
  '&:hover': { backgroundColor: '#0077B6', color: 'white' }
};

const signupBtnStyle = {
  backgroundColor: '#00B4D8',
  fontWeight: 600,
  '&:hover': { backgroundColor: '#0077B6' }
};

const exploreBtnStyle = {
  backgroundColor: '#03045E',
  color: 'white',
  '&:hover': { backgroundColor: '#0077B6' }
};

const postJobBtnStyle = {
  backgroundColor: '#0077B6',
  color: 'white',
  '&:hover': { backgroundColor: '#00B4D8' }
};
