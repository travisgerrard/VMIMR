const mongoose = require('mongoose');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

const Condition = mongoose.model('conditions');
const ConditionLearning = mongoose.model('conditionLearnings');

var pushNotification = require('../services/pushNotifications');

module.exports = app => {
  app.get('/api/condition/', requireAuth, async (req, res) => {
    try {
      const conditionsArray = await Condition.find({}).populate({
        path: '_learnings'
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

  app.get('/api/condition/:conditionId', requireAuth, async (req, res) => {
    var conditionId = req.params.conditionId;

    try {
      const condition = await Condition.findOne({
        _id: conditionId
      }).populate({
        path: '_learnings'
      });

      res.send(condition);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('/api/condition', requireAuth, async (req, res) => {
    const { condition, tags, learning } = req.body;

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

        console.log('Going to make a users array');
        pushNotification.sendMessageTo(
          `Learning about ${condition} was just added`,
          learning.usersTagged
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

  app.put('/api/condition/', requireAuth, async (req, res) => {
    const { condition, tags, conditionId } = req.body;
    console.log(
      `condition: ${condition}, tags: ${tags}, conditionId: ${conditionId}`
    );

    // Updated condition and populate with learnings and send back to client
    var conditionToUpdate = await Condition.findOneAndUpdate(
      {
        _id: conditionId
      },
      {
        $set: {
          condition: condition,
          tags: tags,
          dateUpdated: Date.now()
        }
      },
      { new: true }
    ).populate({
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
    await conditionToUpdate.save();

    res.send(conditionToUpdate);
  });

  app.delete('/api/condition/:conditionId', requireAuth, async (req, res) => {
    var conditionId = req.params.conditionId;

    //Now we delete the learning
    await Condition.findByIdAndRemove(conditionId, function(err, offer) {
      if (err) {
        throw err;
      }
    });

    res.send({ conditionDeleted: conditionId });
  });
};
