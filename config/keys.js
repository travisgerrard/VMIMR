if (process.env.NODE_ENV === 'production') {
  // produciton, return prod keys
  module.exports = require('./prod');
} else {
  //in development, return dev keys
  module.exports = require('./dev');
}
