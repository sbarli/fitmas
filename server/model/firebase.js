const fb = require('firebase-admin');
const moment = require('moment');

// Import Firebase App Credentials
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// Initialize Firebase App / Database
fb.initializeApp({
  credential: fb.credential.cert(serviceAccount),
  databaseURL: 'https://fitmas-2019.firebaseio.com',
});

// Connect to Firebase Cloud Firestore
const db = fb.firestore();
console.log(
  db
    ? `${moment()}: connected to firebase`
    : `${moment()}: error connecting to firebase`
);

module.exports = db;