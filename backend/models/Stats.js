// models/Stats.js
const mongoose = require('mongoose');

const StatsSchema = new mongoose.Schema({
  visits: {
    type: Number,
    default: 0,
  },
  downloads: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Stats', StatsSchema);