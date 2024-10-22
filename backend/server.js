const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');  // For serving static files
require('dotenv').config();  // To use environment variables from .env

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));


// Importing routes for the rule engine
const ruleRoutes = require('./routes/ruleRoutes');
app.use('/api/rules', ruleRoutes);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Catch-all route to serve React app for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Error handling for any uncaught errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
