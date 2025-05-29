import React from 'react';
import { Box, Container, Grid, Typography, Button, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  UserPlus, Search, CalendarCheck, CheckCircle,
  UploadCloud, Filter, ClipboardCheck, BadgeCheck
} from 'lucide-react';

const commonCardStyles = {
  height: '100%',
  borderRadius: '24px',
  bgcolor: '#FFFFFF'
};

const commonContentStyles = {
  textAlign: 'center',
  p: 4
};

const seekerSteps = [
  {
    icon: <UserPlus size={32} color="#00CFFF" />,
    title: 'Create Your Profile',
    description: 'Sign up and build your profile showcasing your skills and availability.'
  },
  {
    icon: <Search size={32} color="#00CFFF" />,
    title: 'Discover Opportunities',
    description: 'Browse and filter jobs based on your location, skills, and schedule.'
  },
  {
    icon: <CalendarCheck size={32} color="#00CFFF" />,
    title: 'Apply & Schedule',
    description: 'Apply for jobs that interest you and arrange your work schedule.'
  },
  {
    icon: <CheckCircle size={32} color="#00CFFF" />,
    title: 'Complete & Get Paid',
    description: 'Finish your tasks and receive payment directly through the platform.'
  }
];

const providerSteps = [
  {
    icon: <UploadCloud size={32} color="#00CFFF" />,
    title: 'Post a Job',
    description: 'Easily list the jobs you need help with, specifying requirements and schedule.'
  },
  {
    icon: <Filter size={32} color="#00CFFF" />,
    title: 'Filter Applicants',
    description: 'Review candidates based on skill set, availability, and proximity.'
  },
  {
    icon: <ClipboardCheck size={32} color="#00CFFF" />,
    title: 'Schedule Interviews',
    description: 'Connect with applicants and schedule convenient times for interviews.'
  },
  {
    icon: <BadgeCheck size={32} color="#00CFFF" />,
    title: 'Hire & Pay Securely',
    description: 'Select the best fit and complete payments securely through the platform.'
  }
];

const SectionBlock = ({ title, steps }) => (
  <>
    <Typography variant="h5" align="center" sx={{ fontWeight: 700, color: '#0A2472', mb: 4, mt: 6 }}>
      {title}
    </Typography>
    <Grid container spacing={4} justifyContent="center">
      {steps.map((step, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: index * 1 }}
          >
            <Card elevation={6} sx={commonCardStyles}>
              <CardContent sx={commonContentStyles}>
                <Box sx={{ mb: 2 }}>{step.icon}</Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#001C55', mb: 1 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#0E6BA8' }}>
                  {step.description}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </>
);

export default function JourneySection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        pt: 6,
        pb: 4,
        background: 'linear-gradient(rgba(103, 204, 235, 0.9), rgba(211, 218, 240, 0.9)), url("/public/logo.png") center/cover no-repeat',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Typography variant="h4" align="center" sx={{ fontWeight: 800, color: '#001C55', mb: 2 }}>
            How It Works
          </Typography>
          <Typography variant="h6" align="center" sx={{ color: '#0E6BA8', mb: 5 }}>
            Finding or posting part-time jobs has never been easier. Follow these simple steps to get started.
          </Typography>

          <SectionBlock title="For Job Seekers" steps={seekerSteps} />
          <SectionBlock title="For Job Providers" steps={providerSteps} />

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#001C55', mb: 2 }}>
              Ready to Start?
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#001C55', mb: 2 }}>
              Choose What You Want
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#0E6BA8',
                mr: 2,
                color: '#fff',
                '&:hover': { bgcolor: '#0A2472' }
              }}
              onClick={() => navigate('/signup')}
            >
              Create Your Account
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#0E6BA8',
                color: '#0E6BA8',
                '&:hover': { bgcolor: '#A6E1FA', borderColor: '#0E6BA8' }
              }}
              onClick={() => navigate('/Login')}
            >
              Log in
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
