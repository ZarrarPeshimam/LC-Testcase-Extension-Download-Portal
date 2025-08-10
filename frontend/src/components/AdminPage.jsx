import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [stats, setStats] = useState({ visits: 0, downloads: 0 });
  const [visitList, setVisitList] = useState([]);
  const [downloadList, setDownloadList] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_KEY) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchAdminData = async () => {
        try {
          const visitsResponse = await axios.get(`${API_URL}/admin/visits`, {
            headers: { Authorization: `Bearer ${ADMIN_KEY}` },
          });
          console.log('Visits response data:', visitsResponse.data);

          const downloadsResponse = await axios.get(`${API_URL}/admin/downloads`, {
            headers: { Authorization: `Bearer ${ADMIN_KEY}` },
          });

          const feedbackResponse = await axios.get(`${API_URL}/admin/feedback`, {
            headers: { Authorization: `Bearer ${ADMIN_KEY}` },
          });

          // Safely set state only if the response data is an array
          setVisitList(Array.isArray(visitsResponse.data) ? visitsResponse.data : []);
          setDownloadList(Array.isArray(downloadsResponse.data) ? downloadsResponse.data : []);
          setFeedbackList(Array.isArray(feedbackResponse.data) ? feedbackResponse.data : []);

          setStats({
            visits: Array.isArray(visitsResponse.data) ? visitsResponse.data.length : 0,
            downloads: Array.isArray(downloadsResponse.data) ? downloadsResponse.data.length : 0,
          });

          setLoading(false);
        } catch (err) {
          console.error('Error fetching admin data:', err);
          setIsAuthenticated(false);
          setError('Failed to fetch data. Please re-login.');
          setLoading(false);
        }
      };
      fetchAdminData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-50">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-blue-800 text-center mb-6">
            Admin Login
          </h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Admin Password"
            className="w-full p-3 rounded-md bg-sky-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-gray-800"
            required
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="mt-4 w-full px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-md font-semibold text-lg text-white"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-50">
        <p className="text-xl font-semibold">Loading data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-sky-50 text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-800">
        Admin Dashboard
      </h1>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-blue-800">Total Visits</h2>
          <p className="mt-4 text-5xl font-bold text-blue-500">{stats.visits}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-blue-800">Total Downloads</h2>
          <p className="mt-4 text-5xl font-bold text-blue-500">{stats.downloads}</p>
        </div>
      </div>

      {/* Visit List */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-10">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6">Visit Timestamps</h2>
        <ul className="space-y-2">
          {Array.isArray(visitList) && visitList.length > 0 ? (
            visitList.map((visit, index) => (
              <li key={index} className="border-b border-gray-200 pb-2 text-gray-700">
                {new Date(visit.timestamp).toLocaleString()}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No visits recorded yet.</p>
          )}
        </ul>
      </div>

      {/* Download List */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-10">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6">Download Timestamps</h2>
        <ul className="space-y-2">
          {Array.isArray(downloadList) && downloadList.length > 0 ? (
            downloadList.map((download, index) => (
              <li key={index} className="border-b border-gray-200 pb-2 text-gray-700">
                {new Date(download.timestamp).toLocaleString()}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No downloads recorded yet.</p>
          )}
        </ul>
      </div>

      {/* Feedback List */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6">User Feedback</h2>
        <ul className="space-y-4">
          {Array.isArray(feedbackList) && feedbackList.length > 0 ? (
            feedbackList.map((f, index) => (
              <li key={index} className="border-b border-gray-200 pb-4">
                <p className="text-lg font-semibold">{f.name}</p>
                <p className="text-sm text-gray-600">{f.email}</p>
                <p className="mt-2">{f.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(f.timestamp).toLocaleString()}
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No feedback submitted yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
