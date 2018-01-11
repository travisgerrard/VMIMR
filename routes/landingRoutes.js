const mongoose = require('mongoose');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

const Condition = mongoose.model('conditions');
const ConditionLearning = mongoose.model('conditionLearnings');

const _ = require('lodash');

module.exports = app => {
  app.get('/api/landing/lastfivelearnings/', requireAuth, async (req, res) => {
    try {
      var lastFiveLearnings = await ConditionLearning.find({
        $or: [
          {
            usersTagged: req.user.id
          },
          { _creator: req.user.id }
        ]
      })
        .sort('-dateUpdated')
        .limit(3)
        .select('_condition');
      const arrayOfConditionIds = _.map(lastFiveLearnings, '_condition');
      const arrayOfLearningIds = _.map(lastFiveLearnings, '_id');

      var conditionsToReturnWithLearning = await Condition.find({
        _id: { $in: arrayOfConditionIds }
      }).populate({
        path: '_learnings',
        match: { _id: { $in: arrayOfLearningIds } }
      });
      res.send(conditionsToReturnWithLearning);
    } catch (err) {
      console.log('Sending this error...');
      res.status(422).send(err);
    }
  });
};
