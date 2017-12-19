const mongoose = require('mongoose');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

const Condition = mongoose.model('conditions');
const ConditionLearning = mongoose.model('conditionLearnings');

module.exports = app => {
  app.get('/api/condition/', requireAuth, async (req, res) => {
    console.log(req.user.id);
    try {
      const conditionsArray = await Condition.find({}).populate({
        path: '_learnings',
        match: { _creator: { $eq: req.user.id } }
      });
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
    const { condition, tags, learning } = req.body;

    console.log(condition, tags, learning);

    const conditionExists = await Condition.findOne({
      condition
    });

    if (conditionExists == null) {
      const conditionNew = new Condition({
        tags,
        condition,
        _creator: req.user.id,
        dateCreated: Date.now()
      });

      try {
        // save a new conditions
        await conditionNew.save();

        // If there is a learning associated with new conditions, need to create and save it
        const conditionLearningNew = new ConditionLearning({
          tags,
          whatWasLearned: learning.whatWasLearned,
          dateField: learning.date,
          seenWith: learning.seenWith,
          dateCreated: Date.now(),
          dateUpdated: Date.now(),
          _condition: conditionNew._id,
          _creator: req.user.id
        });

        await conditionLearningNew.save();

        // now need to let the conditions know that the learning exists, and save it
        conditionNew._learnings.push(conditionLearningNew._id);
        await conditionNew.save();

        res.send(conditionNew, conditionLearningNew);
      } catch (err) {
        res.status(422).send(err);
      }
    } else {
      res.status(422).send({ error: 'This condition already exists' });
    }
  });
};
