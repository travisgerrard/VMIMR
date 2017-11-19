// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const keys = require('./config/keys');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// DB Setup
mongoose.connect(keys.mongoURI);
mongoose.Promise = global.Promise;

// App Setup
app.use(morgan('combined')); // Logs incoming requires
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// To make it so react is fallback for paths in app
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assests
  // like out main.js file, or main.css file.
  app.use(express.static('client/build'));

  // Express will serve up index.html
  // IF it doesn't recogize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT);
