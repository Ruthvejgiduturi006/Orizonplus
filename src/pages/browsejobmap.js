import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaMapMarkerAlt, FaRupeeSign, FaArrowLeft } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
import './browsejobmap.css';

const pinIcon = new L.Icon({
  iconUrl: 'locred.gif', // Replace with actual pin image path
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -40],
});

const FlyToLocation = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 13);
  });
  return null;
};

const BrowseJobsMap = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState(null);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('https://orizonplus.onrender.com/api/findjobs');
        const providers = res.data.filter((u) => u.jobProviderProfile);
        const results = [];

        for (let i = 0; i < providers.length; i++) {
          const user = providers[i];
          const profile = user.jobProviderProfile;

          const addressParts = [
            profile.doorNo,
            profile.street,
            profile.location,
            profile.city,
            profile.state,
            'India',
          ];
          const locationName = addressParts.filter(Boolean).join(', ');

          try {
            await delay(1000);
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`);
            const data = await response.json();

            if (data.length > 0) {
              results.push({
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon),
                job: profile,
              });
            }
          } catch (geoErr) {
            console.error('Geolocation error:', geoErr);
          }
        }

        setLocations(results);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching job data:', err);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const defaultPosition = [20.5937, 78.9629];

  return (
    <div className="map-layout">
      <div className="map-sidebar">
        <header className="map-header">
  <h1 className="orizon-title">Orizon+</h1>
  <Link to="/" className="back-button">
    <FaArrowLeft /> Back to Home
  </Link>
</header>


        <h2 className="map-title">📍 Job Listings on Map</h2>

        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <>
            <p className="job-count">Showing {locations.length} jobs</p>
            {locations.map((loc, idx) => (
              <div
                key={idx}
                className="job-card"
                onClick={() => setSelectedPosition([loc.lat, loc.lon])}
              >
                <h3><FaBriefcase className="iconnn" /> {loc.job.jobTitle}</h3>
                <p><FaMapMarkerAlt className="iconnn" /> {loc.job.location || loc.job.city}</p>
                <p><FaRupeeSign className="iconnn" /> {loc.job.payDetails}</p>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="map-container">
        <MapContainer center={defaultPosition} zoom={5} style={{ height: '100vh', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {selectedPosition && <FlyToLocation position={selectedPosition} />}
          {locations.map((loc, idx) => (
            <Marker key={idx} position={[loc.lat, loc.lon]} icon={pinIcon}>
              <Popup>
                <strong>{loc.job.jobTitle}</strong><br />
                {loc.job.location || loc.job.city}<br />
                Pay: {loc.job.payDetails}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default BrowseJobsMap;
