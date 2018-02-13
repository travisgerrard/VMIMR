const mongoose = require('mongoose');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

const Condition = mongoose.model('conditions');
const ConditionLearning = mongoose.model('conditionLearnings');

const Expo = require('expo-server-sdk');
const User = mongoose.model('users');
const _ = require('lodash');

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
        sendMessageTo(
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
};

async function sendMessageTo(message, users) {
  var usersArray = await User.find({
    _id: { $in: users }
  }).select('pushToken -_id');
  console.log('Users to send message to before map', usersArray);
  const arrayOfPushTokens = _.compact(_.map(usersArray, 'pushToken'));

  console.log('Users to send message to after map', arrayOfPushTokens);

  if (arrayOfPushTokens.length) {
    // Create a new Expo SDK client
    let expo = new Expo();

    // Create the messages that you want to send to clents
    let messages = [];
    for (let pushToken of arrayOfPushTokens) {
      // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }

      // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
      messages.push({
        to: pushToken,
        sound: 'default',
        body: message,
        data: { withSome: 'data' }
      });
    }

    // The Expo push notification service accepts batches of notifications so
    // that you don't need to send 1000 requests to send 1000 notifications. We
    // recommend you batch your notifications to reduce the number of requests
    // and to compress them (notifications with similar content will get
    // compressed).
    let chunks = expo.chunkPushNotifications(messages);

    (async () => {
      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (let chunk of chunks) {
        try {
          let receipts = await expo.sendPushNotificationsAsync(chunk);
          console.log(receipts);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }
}
