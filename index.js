// Main starting point of the application
const express = require('express');
const mongoose = require('mongoose');
const expressGraphQL = require('express-graphql');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const keys = require('./config/keys');
const schema = require('./schema/schema');

// Set up mongoose to connect to mongLab. Connect to ES2015 Promse
mongoose.connect(keys.mongoURI);
mongoose.Promise = global.Promise;

require('./models/user');
require('./models/condition');
require('./models/conditionLearning');
require('./services/passport');

const app = express();

// App Setup
//app.use(morgan('combined')); // Logs incoming requires
app.use(bodyParser.json());

require('./routes/authRoutes')(app);
require('./routes/conditionRoutes')(app);
require('./routes/learningRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/landingRoutes')(app);

const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

console.log(requireAuth);

app.all('/graphql', requireAuth);
app.get(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  }),
);
app.post(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  }),
);
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
