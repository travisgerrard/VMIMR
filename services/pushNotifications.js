const Expo = require('expo-server-sdk');
const _ = require('lodash');

const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = {
  sendMessageTo: async function(message, users) {
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
          console.error(
            `Push token ${pushToken} is not a valid Expo push token`
          );
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
};
