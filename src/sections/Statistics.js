import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';

const data = [
  { name: 'Jobs Posted', value: 400, icon: '📄' },
  { name: 'Job Seekers', value: 600, icon: '👤' },
  { name: 'Businesses', value: 200, icon: '🏢' },
  { name: 'Avg Hire Time', value: 5, icon: '⏱️' }
];
const COLORS = ['#023e8a', '#0077b6', '#0096c7', '#00b4d8'];

export default function Statistics() {
  return (
    <Box sx={{ position: 'relative', py: 10, overflow: 'hidden' }}>
    {/* Background Video */}
    <Box
      component="video"
      autoPlay
      loop
      muted
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -2,
      }}
    >
      <source src="/video/3141210-uhd_3840_21625fps.mp4" type="video/mp4" />
    </Box>

    {/* Overlay */}
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h3" align="center" gutterBottom sx={{ color: '#03045E', fontWeight: 700 }}>
            Platform Statistics
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 4, color: '#0077B6' }}>
            A quick look at how Orizon+ is helping your community.
          </Typography>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                label={({ name, icon }) => `${icon} ${name}`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}`, name]} />
              <Legend formatter={(value, entry) => `${data.find(item => item.name === value)?.icon || ''} ${value}`} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </Container>
    </Box>
  );
}
