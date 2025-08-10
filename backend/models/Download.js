// models/Download.js
const mongoose = require('mongoose');

const DownloadSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Download', DownloadSchema);