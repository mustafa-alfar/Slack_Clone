const functions = require('firebase-functions');
const admin = require('firebase-admin');

const db = admin.firestore();

module.exports = functions.database
  .ref('/status/{uid}')
  .onUpdate(async (change, context) => {
    const eventStatus = change.after.val();

    const userStatusFirestoreRef = db.doc(`users/${context.params.uid}`);

    const statusSnapshot = await change.after.ref.once('value');
    const status = statusSnapshot.val();

    if (status.last_changed > eventStatus.last_changed) {
      return null;
    }

    eventStatus.last_changed = new Date(eventStatus.last_changed);

    return userStatusFirestoreRef.update({ status: eventStatus });
  });

// module.exports = functions.database
// .ref('/status/{userId}')
// .onUpdate(async (change, context) => {
//   const eventStatus = change.after.val();
//   const userDoc = db.doc(`users/${context.params.userId}`);

//   return change.after.ref.once('value').then(snapshot => {
//     const status = snapshot.val();
//     if (status.last_changed > eventStatus.last_changed) {
//       return;
//     }
//     eventStatus.last_changed = new Date(eventStatus.last_changed);
//     userDoc.update({ status: eventStatus });
//   });
// });
