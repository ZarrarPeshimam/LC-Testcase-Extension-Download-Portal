const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Define Schemas and Models
const visitSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now }
});

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const downloadSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now }
});

const Visit = mongoose.model('Visit', visitSchema);
const Feedback = mongoose.model('Feedback', feedbackSchema);
const Download = mongoose.model('Download', downloadSchema);

// Admin Authentication Middleware
const adminAuth = (req, res, next) => {
  const adminKey = req.headers['authorization'];
  if (adminKey === `Bearer ${process.env.ADMIN_KEY}`) {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden: Invalid Admin Key' });
  }
};

// Public Routes
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});
app.post('/track-visit', async (req, res) => {
  try {
    const newVisit = new Visit();
    await newVisit.save();
    res.status(200).send('Visit tracked');
  } catch (err) {
    res.status(500).json({ error: 'Failed to track visit' });
  }
});

app.post('/track-download', async (req, res) => {
  try {
    const newDownload = new Download();
    await newDownload.save();
    res.status(200).send('Download tracked');
  } catch (err) {
    res.status(500).json({ error: 'Failed to track download' });
  }
});

app.post('/submit-feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

// Admin Protected Routes
app.get('/admin/visits', adminAuth, async (req, res) => {
  try {
    // Corrected to use find() to get all documents as an array
    const visits = await Visit.find().sort({ timestamp: -1 });
    res.status(200).json(visits);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch visits' });
  }
});

app.get('/admin/downloads', adminAuth, async (req, res) => {
  try {
    // Corrected to use find() to get all documents as an array
    const downloads = await Download.find().sort({ timestamp: -1 });
    res.status(200).json(downloads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch downloads' });
  }
});

app.get('/admin/feedback', adminAuth, async (req, res) => {
  try {
    // Corrected to use find() to get all documents as an array
    const feedback = await Feedback.find().sort({ timestamp: -1 });
    res.status(200).json(feedback);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
