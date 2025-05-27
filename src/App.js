// src/App.js

import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './sections/HeroSection';
import JourneySection from './sections/JourneySection';
import ValueSection from './sections/ValueSection';
import ProcessSection from './sections/ProcessSection';
import Statistics from './sections/Statistics';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import JobSeekerOnboard from './pages/JobSeekerOnboard';
import JobProviderOnboard from './pages/JobProviderOnboard';
import BrowseJobs from './pages/BrowseJobs';

export default function App() {
  const [showLangDropdown, setShowLangDropdown] = useState(false);

 useEffect(() => {
  const addGoogleTranslateScript = () => {
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,hi,te,ta,kn,ml,bn,gu,mr,pa,ur',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            'google_translate_element'
          );
        }
      };

      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.onerror = () => {
        console.warn('Google Translate failed to load.');
      };
      document.body.appendChild(script);
    }
  };

  addGoogleTranslateScript();
}, []);

  const handleLangSelect = (langCode) => {
    const iframe = document.querySelector('iframe');
    const innerDoc = iframe?.contentDocument || iframe?.contentWindow?.document;
    const select = innerDoc?.querySelector('.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
      setShowLangDropdown(false); // close dropdown after selecting
    }
  };

  const languageOptions = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'Hindi' },
    { code: 'te', label: 'Telugu' },
    { code: 'ta', label: 'Tamil' },
    { code: 'kn', label: 'Kannada' },
    { code: 'ml', label: 'Malayalam' },
    { code: 'bn', label: 'Bengali' },
    { code: 'gu', label: 'Gujarati' },
    { code: 'mr', label: 'Marathi' },
    { code: 'pa', label: 'Punjabi' },
    { code: 'ur', label: 'Urdu' },
  ];

  return (
    <Router>
      <div>
        {/* Hidden Google Translate element */}
        <div id="google_translate_element" style={{ display: 'none' }}></div>

        {/* Floating Language Icon + Dropdown */}
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
        }}>
          <button
            onClick={() => setShowLangDropdown(prev => !prev)}
            style={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              fontSize: '24px',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
            }}
            title="Select Language"
          >
            🌐
          </button>

          {showLangDropdown && (
            <div style={{
              marginTop: '10px',
              backgroundColor: '#fff',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              padding: '10px',
              width: '180px',
              position: 'absolute',
              bottom: '60px',
              right: '0',
              textAlign: 'left',
              animation: 'fadeIn 0.3s ease-in-out',
            }}>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {languageOptions.map(lang => (
                  <li
                    key={lang.code}
                    onClick={() => handleLangSelect(lang.code)}
                    style={{
                      padding: '8px 12px',
                      cursor: 'pointer',
                      borderRadius: '6px',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {lang.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* App Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <JourneySection />
                <ValueSection />
                <Statistics />
                <ProcessSection />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobseeker-onboard" element={<JobSeekerOnboard />} />
          <Route path="/jobprovider-onboard" element={<JobProviderOnboard />} />
          <Route path="/BrowseJobs" element={<BrowseJobs />} />
        </Routes>
      </div>
    </Router>
  );
}
