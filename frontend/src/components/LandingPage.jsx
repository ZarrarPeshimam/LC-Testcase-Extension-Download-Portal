// src/components/LandingPage.jsx
import React, { useEffect } from 'react'; // Import useEffect
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import FadeInOnScroll from './FadeInOnScroll'; // Import the FadeInOnScroll component

const API_URL = import.meta.env.VITE_API_URL; // Ensure this is defined in your .env.local

const LandingPage = () => {
  // Track a visit when the component loads
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await axios.post(`${API_URL}/track-visit`);
        //console.log("API URL is:", API_URL);
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };
    trackVisit();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleDownload = async () => {
    try {
      // Track the download via API
      await axios.post(`${API_URL}/track-download`);
      // Redirect to the extension file (replace with your actual .zip path)
      window.location.href = '/TLE-extention.zip';
    } catch (error) {
      console.error('Error tracking download:', error);
      // Fallback or user notification if tracking fails
      window.location.href = '/TLE-extention.zip'; // Still try to redirect
    }
  };

  return (
    <div className="text-gray-800 p-4 sm:p-8">
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 py-4">
        <nav className="container mx-auto flex justify-start px-4 sm:px-6 lg:px-0 ml-6">
          <ul className="flex space-x-6 sm:space-x-8">
            <li>
              <Link
                to="/"
                className="text-blue-500 font-semibold text-base sm:text-lg hover:text-blue-600 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/feedback"
                className="text-gray-600 font-semibold text-base sm:text-lg hover:text-gray-800 transition"
              >
                Feedback
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto py-20 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 px-4 sm:px-6 lg:px-0">
        <FadeInOnScroll className="w-full lg:w-1/2 text-left" direction="left">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-800 leading-tight">
            TLE Case Generator
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-800">
            Chrome extension designed to generate randomized and valid test cases
            for competitive programming problems. It helps developers and students
            quickly create test cases based on variable constraints such as type,
            size, range, and uniqueness, helping to overcome TLE (Time Limit Exceeded)
            issues during algorithm testing.
          </p>
        </FadeInOnScroll>
        <button
          onClick={handleDownload}
          className="w-full lg:w-auto px-6 py-3 bg-blue-500 text-white hover:bg-blue-600 rounded-lg text-base sm:text-lg font-semibold transition-colors cursor-pointer"
        >
          Download Extension
        </button>
      </section>

      {/* Video Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-0">
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">
          See Setup
        </h2>
        <h3 className="text-center mb-8">
          Extract the zip file - Go to chrome://extensions and enable developer mode.<br />
          Note: When selecting a folder, ensure you choose the inner directory that contains the `html` and `js` files, <br />not the outer folder created by unzipping.
        </h3>
        <FadeInOnScroll className="flex justify-center mb-12" direction="up">
          <video className="w-full max-w-4xl rounded-lg shadow-xl" controls>
            <source src="/setup-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </FadeInOnScroll>

        <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">
          How to use
        </h2>
        <FadeInOnScroll className="flex justify-center mb-20" direction="up">
          <video className="w-full max-w-4xl rounded-lg shadow-xl" controls>
            <source src="/demo-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </FadeInOnScroll>
      </section>

      {/* Footer Section */}
      <footer className="mt-12 py-4 text-center border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-0">
          <p className="text-gray-600">Developed by Zarrar Peshimam</p>
          <div className="mt-2 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-8">
            <a
              href="https://github.com/ZarrarPeshimam/TLE-Case-Generator-Extension"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 font-semibold transition"
            >
              GitHub Repository
            </a>
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;