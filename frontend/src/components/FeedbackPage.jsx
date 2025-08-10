// src/components/FeedbackPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Get the API URL from the environment variables
const API_URL = import.meta.env.VITE_API_URL;

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState({ name: '', email: '', message: '' });
  const [feedbackStatus, setFeedbackStatus] = useState('');

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFeedbackStatus('Submitting...');
    
    try {
      // Send the feedback data to the backend
      await axios.post(`${API_URL}/submit-feedback`, feedback);
      
      setFeedbackStatus('Thank you for your feedback! 😊');
      setFeedback({ name: '', email: '', message: '' });
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setFeedbackStatus('Submission failed. Please try again.');
    }
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="text-gray-800 p-4 sm:p-8">
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 py-4">
        <nav className="container mx-auto flex justify-start px-4 sm:px-6 lg:px-0 ml-6">
          <ul className="flex space-x-6 sm:space-x-8">
            <li>
              <Link
                to="/"
                className="text-gray-600 font-semibold text-base sm:text-lg hover:text-gray-800 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/feedback"
                className="text-blue-500 font-semibold text-base sm:text-lg hover:text-blue-600 transition"
              >
                Feedback
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Feedback Section */}
      <section className="container mx-auto max-w-xl bg-white rounded-lg shadow-lg p-8 mt-20 sm:mt-28">
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">
          Share Your Feedback
        </h2>
        <form onSubmit={handleFeedbackSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            value={feedback.name}
            onChange={handleFeedbackChange}
            placeholder="Your Name"
            className="w-full p-4 rounded-md bg-sky-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-base sm:text-lg transition"
            required
          />
          <input
            type="email"
            name="email"
            value={feedback.email}
            onChange={handleFeedbackChange}
            placeholder="Your Email"
            className="w-full p-4 rounded-md bg-sky-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-base sm:text-lg transition"
            required
          />
          <textarea
            name="message"
            value={feedback.message}
            onChange={handleFeedbackChange}
            placeholder="Your Feedback"
            rows="5"
            className="w-full p-4 rounded-md bg-sky-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-base sm:text-lg transition resize-y"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white text-lg font-semibold transition-colors shadow-md"
          >
            Submit Feedback
          </button>
        </form>
        {feedbackStatus && (
          <p className="mt-6 text-center text-sm sm:text-base text-gray-700">
            {feedbackStatus}
          </p>
        )}
      </section>
    </div>
  );
};

export default FeedbackPage;