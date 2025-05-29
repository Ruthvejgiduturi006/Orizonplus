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
import About from './pages/about';

export default function App() {
  const [translateVisible, setTranslateVisible] = useState(false);

  useEffect(() => {
  if (window.googleTranslateScriptLoaded) return;

  window.googleTranslateScriptLoaded = true;

  const script = document.createElement('script');
  script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.body.appendChild(script);

  window.googleTranslateElementInit = () => {
    if (window.googleTranslateInitialized) return;
    window.googleTranslateInitialized = true;

    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'en,te,hi,ta,kn,ml,es'
        // Removed layout option to avoid UI duplication
      },
      'google_translate_element'
    );
  };
}, []);


  return (
    <Router>
      <div>
        {/* Google Translate container, hidden by default */}
        <div
          id="google_translate_element"
          style={{
            position: 'fixed',
            bottom: 50,
            right: 10,
            zIndex: 9999,
            display: translateVisible ? 'block' : 'none',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: 5,
            padding: 5,
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          }}
        ></div>

        {/* Translate toggle button */}
        <button
          onClick={() => setTranslateVisible(!translateVisible)}
          style={{
            position: 'fixed',
            bottom: 10,
            right: 10,
            zIndex: 10000,
            backgroundColor: '#4285F4',
            border: 'none',
            borderRadius: '50%',
            width: 40,
            height: 40,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
            color: 'white',
            fontSize: 20,
          }}
          aria-label="Toggle Google Translate"
          title="Translate"
        >
          🌐
        </button>

        {/* App routes */}
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
          <Route path='/about' element={<About/>}/>
        </Routes>

        {/* CSS to completely hide Google Translate top bar */}
        <style>{`
          .goog-te-banner-frame.skiptranslate,
          iframe.goog-te-banner-frame {
            display: none !important;
          }

          body {
            top: 0px !important;
          }

          body > .skiptranslate {
            display: none !important;
          }
        `}</style>
      </div>
    </Router>
  );
}
