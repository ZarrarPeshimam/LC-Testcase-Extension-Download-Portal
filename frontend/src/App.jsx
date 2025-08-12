// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios'; // We'll use axios for the ping
import LandingPage from './components/LandingPage';
import FeedbackPage from './components/FeedbackPage';
import AdminPage from './components/AdminPage';
import LoadingScreen from "./components/LoadingScreen";
import './App.css';

function App() {
  const API_URL = import.meta.env.VITE_API_URL;
  // Add state to track if the backend is ready
  const [isBackendReady, setIsBackendReady] = useState(false);

  useEffect(() => {
    // Ping the backend on component mount
    axios.get(`${API_URL}/ping`)
      .then(() => {
        // If the ping is successful, set the state to true
        setIsBackendReady(true);
      })
      .catch((error) => {
        console.error('Failed to ping backend:', error);
        // Even if the ping fails, we show the page to avoid a stuck loading screen.
        // The individual API calls will handle their own errors.
        setIsBackendReady(true);
      });
  }, []);

  // Show a loading screen if the backend is not ready
  if (!isBackendReady) {
    return <LoadingScreen />;
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;