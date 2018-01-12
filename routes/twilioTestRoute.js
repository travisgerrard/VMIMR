const mongoose = require('mongoose');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const twilio = require('../services/twilio');

module.exports = app => {
  app.post('/api/twilio', async (req, res) => {
    if (!req.body.phone) {
      return res.status(422).send({ error: 'Bad input' });
    }
    const phone = String(req.body.phone).replace(/[^\d]/g, '');
    const code = Math.floor(Math.random() * 8999 + 1000);

    twilio.messages.create(
      {
        body: 'Grumps, this is travis!',
        to: phone,
        from: '+13473703155'
      },
      err => {
        if (err) {
          return res.status(422).send(err);
        }
        res.send({ success: true });
      }
    );
  });
};
