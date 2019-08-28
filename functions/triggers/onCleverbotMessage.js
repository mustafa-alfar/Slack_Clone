const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();

const bot = {
  displayName: 'cleverbot',
  uid: 'cleverbot',
  photoUrl: 'https://i.imgur.com/ydOMC2c.png',
  status: {
    lastChanged: new Date(),
    state: 'online'
  },
  channels: {
    general: true
  }
};

db.collection('users')
  .doc(bot.uid)
  .set(bot, { merge: true });

module.exports = functions.firestore
  .document('channels/general/messages/{messageId}')
  .onCreate((snap, context) => {
    const newValue = snap.data();
    if (!newValue.text.includes('@cleverbot')) {
      return;
    }
    return db.collection(`channels/general/messages`).add({
      user: db.collection('users').doc(bot.uid),
      text: 'hey, whats up ?',
      createdAt: new Date()
    });
  });
