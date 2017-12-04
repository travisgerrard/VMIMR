const mongoose = require('mongoose');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

const Condition = mongoose.model('conditions');

module.exports = app => {
  app.get('/api/conditions', requireAuth, function(req, res) {
    console.log(req.user);
    res.send({ message: 'This is the Conditions message' });
  });

  app.post('/api/condition', requireAuth, async (req, res) => {
    console.log(req.body);
    console.log(req.user);

    const { condition, rotation } = req.body;

    const conditionNew = new Condition({
      catagoryTag: rotation,
      condition,
      _creator: req.user.id,
      dateCreated: Date.now()
    });

    try {
      await conditionNew.save();

      res.send(conditionNew);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
