const mongoose = require('mongoose');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

const Condition = mongoose.model('conditions');

module.exports = app => {
  app.get('/api/condition/', requireAuth, async (req, res) => {
    try {
      const conditionsArray = await Condition.find({ _creator: req.user.id });
      var conditionsObject = {};
      conditionsArray.forEach(function(condition) {
        conditionsObject[condition._id] = condition;
      });
      res.send(conditionsObject);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('/api/condition', requireAuth, async (req, res) => {
    const { condition, tags, seenWith, date, whatWasLearned } = req.body;

    console.log(req.body);

    res.send({ message: 'Thanks!' });
    // const conditionExists = await Condition.findOne({
    //   condition
    // });
    //
    // if (conditionExists == null) {
    //   const conditionNew = new Condition({
    //     catagoryTag: rotation,
    //     condition,
    //     _creator: req.user.id,
    //     dateCreated: Date.now()
    //   });
    //
    //   try {
    //     await conditionNew.save();
    //
    //     res.send(conditionNew);
    //   } catch (err) {
    //     res.status(422).send(err);
    //   }
    // } else {
    //   res.status(422).send({ error: 'This condition already exists' });
    // }
  });
};
