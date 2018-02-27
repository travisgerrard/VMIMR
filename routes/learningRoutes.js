const mongoose = require('mongoose');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

const Condition = mongoose.model('conditions');
const ConditionLearning = mongoose.model('conditionLearnings');

module.exports = app => {
  app.delete(
    '/api/condition/learning/:learningId',
    requireAuth,
    async (req, res) => {
      var learningId = req.params.learningId;

      //Load learning before deleting to find out what condition it's related to
      var learningToUpdate = await ConditionLearning.findOne({
        _id: learningId
      });
      const conditionId = learningToUpdate._condition;

      //Now we delete the learning
      await ConditionLearning.findByIdAndRemove(learningId, function(
        err,
        offer
      ) {
        if (err) {
          throw err;
        }
      });

      //Then pull and send the condition with its updated associated learning
      conditionToSend = await Condition.findOne({
        _id: conditionId
      }).populate({
        path: '_learnings',
        match: { _creator: { $eq: req.user.id } }
      });

      res.send(conditionToSend);
    }
  );

  app.put('/api/condition/learning', requireAuth, async (req, res) => {
    const {
      seenWith,
      date,
      whatWasLearned,
      usersTagged,
      learningId
    } = req.body;

    var learningToUpdate = await ConditionLearning.findOneAndUpdate(
      {
        _id: learningId
      },
      {
        $set: {
          whatWasLearned: whatWasLearned,
          dateField: date,
          seenWith: seenWith,
          usersTagged: usersTagged,
          dateUpdated: Date.now()
        }
      },
      { new: true }
    );
    await learningToUpdate.save();

    const conditionToSend = await Condition.findOne({
      _id: learningToUpdate._condition
    }).populate({
      path: '_learnings',
      match: {
        $or: [
          {
            _creator: { $eq: req.user.id }
          },
          {
            usersTagged: req.user.id
          }
        ]
      }
    });

    res.send(conditionToSend);
  });

  app.post('/api/condition/learning', requireAuth, async (req, res) => {
    const {
      seenWith,
      date,
      whatWasLearned,
      conditionId,
      usersTagged
    } = req.body;

    const conditionLearningNew = new ConditionLearning({
      whatWasLearned: whatWasLearned,
      dateField: date,
      seenWith: seenWith,
      usersTagged: usersTagged,
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
      _condition: conditionId,
      _creator: req.user.id
    });

    await conditionLearningNew.save();

    var conditionToAddLearning = await Condition.findOne({
      _id: conditionId
    });

    conditionToAddLearning._learnings.push(conditionLearningNew._id);
    await conditionToAddLearning.save();

    const conditionToSend = await Condition.findOne({
      _id: conditionId
    }).populate({
      path: '_learnings',
      match: { _creator: { $eq: req.user.id } }
    });

    res.send(conditionToSend);
  });
};
