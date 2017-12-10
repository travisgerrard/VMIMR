const mongoose = require('mongoose');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

const Condition = mongoose.model('conditions');

module.exports = app => {
  app.get('/api/condition/', requireAuth, async (req, res) => {
    try {
      const conditions = await Condition.find({ _creator: req.user.id });
      res.send(conditions);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('/api/condition', requireAuth, async (req, res) => {
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
