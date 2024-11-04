const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

let database_host = process.env.DB_HOST || "";
let database = process.env.DB_NAME || "";
let database_port = process.env.DB_PORT || "";
let database_username = process.env.DB_USER || "";
let database_password = process.env.DB_PASSWORD || "";

const MONGODB_URI = `mongodb://${database_username}:${database_password}@${database_host}:${database_port}/${database}`;

// Initialize the app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes'); // Import the authentication routes

// MongoDB connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Use the routes
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes); // Add the authentication routes

// Simple route
app.get('/', (req, res) => {
  res.send('Welcome to the Express REST APIIIII!');
});

// Set the port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
