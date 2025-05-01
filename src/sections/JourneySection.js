import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { Clock, MapPin, Briefcase, Users } from 'lucide-react';

const features = [
  {
    icon: <Clock size={28} color="#0077B6" />,
    title: 'Flexible Hours',
    description: 'Work when it suits you. Find opportunities that align with your schedule and lifestyle.'
  },
  {
    icon: <MapPin size={28} color="#0077B6" />,
    title: 'Location-Based',
    description: 'Discover jobs near you. Reduce time and connect with local businesses.'
  },
  {
    icon: <Briefcase size={28} color="#0077B6" />,
    title: 'Diverse Opportunities',
    description: 'From internships to part-time roles, find the perfect match for your career goals.'
  },
  {
    icon: <Users size={28} color="#0077B6" />,
    title: 'Community Network',
    description: 'Build connections with local employers and professionals in your field.'
  }
];

export default function JourneySection() {
  return (
    <Box sx={{ py: 10, bgcolor: '#EEF0F2', color: '#03045E' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ fontWeight: 800, color: '#03045E', mb: 2 }}
          >
            Why Choose Orizon+
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 6, maxWidth: 800, mx: 'auto', color: '#0077B6' }}
          >
            Our platform is designed to make finding and posting part-time jobs simpler, faster, and more efficient.
          </Typography>

          {/* Cards Grid */}
          <Grid container spacing={3} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card
                    sx={{
                      width: 220,
                      p: 3,
                      bgcolor: '#FFFFFF',
                      borderRadius: '16px',
                      textAlign: 'center',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                      height: '100%',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ mb: 1 }}>{feature.icon}</Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#444' }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}
