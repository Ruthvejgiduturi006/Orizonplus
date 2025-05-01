import React from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      color: 'white',
      pt: 15
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2,
                mb: 3
              }}
            >
              Discover Flexible Opportunities
            </Typography>
            
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
              Connect with local part-time jobs that match your schedule and skills.
              <Box component="span" sx={{ color: '#00C4FF', fontWeight: 600 }}> Orizon+</Box> brings opportunities closer.
            </Typography>

            <Box sx={{ maxWidth: 600 }}>
              <TextField
                fullWidth
                placeholder="Search jobs, skills, or companies"
                variant="outlined"
                InputProps={{
                  sx: {
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    height: '56px',
                    '&:hover': { 
                      boxShadow: '0 0 0 2px rgba(0, 196, 255, 0.5)' 
                    }
                  }
                }}
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  py: 2,
                  bgcolor: '#00C4FF',
                  '&:hover': { bgcolor: '#0099CC' },
                  fontSize: '1.1rem',
                  fontWeight: 600
                }}
                onClick={() => navigate('/browse')}
              >
                Find Jobs
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 4,
              p: 4,
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <Stack spacing={3} sx={{ color: 'white' }}>
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  sx={{
                    py: 2,
                    borderWidth: 2,
                    borderColor: '#00C4FF',
                    color: 'white',
                    '&:hover': { 
                      borderWidth: 2,
                      bgcolor: 'rgba(0, 196, 255, 0.1)' 
                    }
                  }}
                  onClick={() => navigate('/browse')}
                >
                  Browse Jobs
                </Button>
                
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    py: 2,
                    bgcolor: '#00C4FF',
                    '&:hover': { bgcolor: '#0099CC' },
                    fontWeight: 600
                  }}
                  onClick={() => navigate('/post-job')}
                >
                  Post a Job
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;