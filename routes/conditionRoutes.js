const mongoose = require('mongoose');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

const Condition = mongoose.model('conditions');
const ConditionLearning = mongoose.model('conditionLearnings');

module.exports = app => {
  app.get('/api/condition/', requireAuth, async (req, res) => {
    try {
      const conditionsArray = await Condition.find({}).populate({
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
      var conditionsObject = {};
      conditionsArray.forEach(function(condition) {
        conditionsObject[condition._id] = condition;
      });
      res.send(conditionsObject);
    } catch (err) {
      res.status(422).send(err);
    }
  });

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
          usersTagged: learning.usersTagged,
          dateCreated: Date.now(),
          dateUpdated: Date.now(),
          _condition: conditionNew._id,
          _creator: req.user.id
        });

        await conditionLearningNew.save();

        // now need to let the conditions know that the learning exists, and save it
        conditionNew._learnings.push(conditionLearningNew._id);
        await conditionNew.save();

        const conditionToSend = await Condition.findOne({ condition }).populate(
          {
            path: '_learnings',
            match: { _creator: { $eq: req.user.id } }
          }
        );

        res.send(conditionToSend);
      } catch (err) {
        console.log('Sending this error...');
        res.status(422).send(err);
      }
    } else {
      res.status(422).send({ error: 'This condition already exists' });
    }
  });
};
