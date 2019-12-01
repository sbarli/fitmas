const express = require('express');
const moment = require('moment');
const db = require('./model/firebase');

const app = express();
const PORT = 8080;
const listeningCB = () => {
  process.env.NODE_ENV
    ? console.log(`${moment()}: ${process.env.NODE_ENV} server listening on port ${PORT}`)
    : console.log(`${moment()}: default server listening on port ${PORT}`)
};

const processFirebaseDoc = doc => ({
  id: doc.id,
  ...doc.data(),
});

app.get('/api/users/:username/plan',
  // get user
  (req, res, next) => {
    db.collection('users')
      .where('username', '==', req.params.username)
      .get()
      .then((snapshot) => {
        if (!snapshot
          || !snapshot.docs
          || !snapshot.docs.length) {
          res.locals.getUserError = `no user record found for username: ${req.params.username}`;
          console.log(res.locals.getUserError);
          return next();
        }
        res.locals.user = processFirebaseDoc(snapshot.docs[0]);
        return next();
      })
      .catch((err) => {
        res.locals.getUserError = {
          msg: `error getting user record for username: ${req.params.username}`,
          err,
        };
        console.log(res.locals.getUserError);
        return next();
      });
  },
  // get user plan items
  (req, res, next) => {
    db.collection('plan_items')
      .where('user.username', '==', req.params.username)
      .get()
      .then((snapshot) => {
        if (!snapshot
          || !snapshot.docs) {
          res.locals.getPlanError = `no user record found for username: ${req.params.username}`;
          console.log(res.locals.getPlanError);
          return next();
        }
        res.locals.planItems = snapshot.docs.map(processFirebaseDoc);
        return next();
      })
      .catch((err) => {
        res.locals.getPlanError = {
          msg: `error getting plan records for username: ${req.params.username}`,
          err,
        };
        console.log(res.locals.getPlanError);
        return next();
      });
  },
  // return data
  (req, res) => {
    if (!res.locals.user
      || !res.locals.planItems) {
      return res.status(400).json({
        success: false,
        data: { ...res.locals },
      })
    }
    return res.status(200).json({
      success: true,
      planItems: [...res.locals.planItems],
    })
  },
);

app.use((req, res) => res.sendStatus(200));

app.listen(PORT, listeningCB);