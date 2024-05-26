const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = parseInt(process.env.PORT || 5000, 10);

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define your routes here
app.use('/api', require('./routes/api')); // Example route

// Handle production environment variables
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the production build
  app.use(express.static('frontend/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

// Handle unhandled rejections in production
process.on('unhandledRejection', error => {
  console.error('Unhandled Rejection at:', error.message, error.stack);
  // We should not exit the Node process on unhandled rejections in production
  // Instead, log the error and continue running
  // This allows us to catch and handle errors in a try/catch block
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Handle process exit events in production
process.on('exit', () => {
  // Perform any necessary cleanup here
});

process.on('SIGTERM', () => {
  // Perform any necessary cleanup here
  // This signal is sent when the parent process (usually the OS) wants to terminate the process
  console.log('Received SIGTERM signal, performing cleanup and exiting.');
  // Perform any necessary cleanup here
  // Exit with a status code of 0 to indicate success
  process.exit(0);
});

process.on('SIGINT', () => {
  // Perform any necessary cleanup here
  // This signal is sent when the user presses Ctrl+C
  console.log('Received SIGINT signal, performing cleanup and exiting.');
  // Perform any necessary cleanup here
  // Exit with a status code of 0 to indicate success
  process.exit(0);
});

