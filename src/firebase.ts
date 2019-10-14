import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBl8BfHhHYExx8WfiRU8A4CKGuzo7PWR5k',
  authDomain: 'final-chat-98cf6.firebaseapp.com',
  databaseURL: 'https://final-chat-98cf6.firebaseio.com',
  projectId: 'final-chat-98cf6',
  storageBucket: 'final-chat-98cf6.appspot.com',
  messagingSenderId: '802400458409',
  appId: '1:802400458409:web:fd086a5ea94edb34'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const rtdb = firebase.database();

interface User {
  displayName: string;
  photoUrl: string;
  uid: string;
}

function setupPresence(user: any) {
  const { uid } = user;

  const userStatusDatabaseRef = firebase.database().ref('/status/' + uid);
  const userStatusFirestoreRef = db.collection('users/').doc(uid);

  const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP
  };

  const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP
  };

  const isOnlineForFirestore = {
    state: 'online',
    last_changed: firebase.firestore.FieldValue.serverTimestamp()
  };

  const isOfflineForFirestore = {
    state: 'offline',
    last_changed: firebase.firestore.FieldValue.serverTimestamp()
  };

  rtdb.ref('.info/connected').on('value', function(snapshot) {
    if (snapshot.val() === false) {
      userStatusFirestoreRef.update({
        status: isOfflineForFirestore
      });
      return;
    }

    userStatusDatabaseRef
      .onDisconnect()
      .set(isOfflineForDatabase)
      .then(function() {
        userStatusDatabaseRef.set(isOnlineForDatabase);
        userStatusFirestoreRef.update({
          status: isOnlineForFirestore
        });
      });
  });
}

export { firebase, db, setupPresence };
