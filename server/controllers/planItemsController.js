const moment = require('moment');

const db = require('../model/firebase');
const PlanItem = require('../model/PlanItem');
const { processFirebaseDoc } = require('../utils/firebase-utils');

const updateFieldWhitelist = {
  date: true,
  type: true,
  category: true,
  item: true,
  items: true,
  notes: true,
  done: true,
};

const createAndValidatePlanItem = (item) => {
  const newItem = new PlanItem(item);

  // make sure item is valid before storing
  if (!newItem.isValidItem()) return false;

  // NOTE: convert custom class back to regular Object to enable saving
  return Object.assign({}, newItem);
};

// const diffPlanItems = (current, updated) => {
//   const different = {};
//   Object.keys(current).forEach(key => {
//     switch (key) {
//       case 'date':
//       case 'type':
//       case 'notes':
//       case 'done':
//         if (current[key] !== updated[key]) different[key] = updated[key];
//         break;
//       case 'category':
//         if (current[key] !== updated[key]
//           && current[key] === 'food') {
//           different[key] = updated[key];
//           different.item = updated.item;
//         }
//         else if (current[key] !== updated[key]
//           && current[key] === 'food') {
//           different[key] = updated[key];
//           different.items = updated.items;
//         }
//         break;
//       case 'items':
//         if (!updated.category)
//     }
//   });
//   if (current.date !== updated.date
//     || current.type !== updated.type
//     || current.category !== updated.category
//     || current.notes !== updated.notes
//     || current.done !== updated.done) different = true;
//   else if (updated.category === 'exercise'
//     && current.item !== updated.item) different = true;
//   else if (updated.category === 'food') {
//     if (current.items.length !== updated.items.length) different = true;
//     else {
//       const updatedItems = updated.items.reduce((diff, item) => {
//         if (!current.items.find(item)) return [...diff, item];
//         return [...diff];
//       }, []);
//       if (updatedItems.length) different = true;
//     }
//   }
//   return different;
// };

const createUpdateItem = (updates) => {
  const validUpdates = Object.keys(updates).reduce((valid, key) => {
    if (updateFieldWhitelist[key]) return { ...valid, [key]: updates[key] };
    return { ...valid };
  }, {});
  return validUpdates;
};

const planItemsController = {};

planItemsController.getPlan = (req, res, next) => {
  db.collection('plan_items')
    .where('user', '==', req.params.username)
    .get()
    .then(snapshot => {
      if (!snapshot
        || !snapshot.docs
        || !snapshot.docs.length) {
        console.log(`${moment()}: WARNING: no plan items found for username: ${req.params.username}`);
        res.locals.plan = [];
        return next();
      }
      res.locals.plan = snapshot.docs.map(processFirebaseDoc);
      return next();
    })
    .catch(err => {
      console.log(`${moment()}: ERROR: error getting plan items for username: ${req.params.username}: `, err);
      return res.status(400).send(err);
    });
};

planItemsController.addPlan = (req, res, next) => {
  // validate request data and convert into properly formatted plan item
  if (!req.body.plan) return res.status(400).send('no plan in req.body');
  res.locals.skippedItems = [];
  const items = req.body.plan
    .map(item => createAndValidatePlanItem(item))
    .filter((item, i) => {
      if (!item) res.locals.skippedItems.push(req.body.plan[i]);
      return item;
    });

  if (!items.length) return res.status(400).send('invalid plan items in req.body');

  const createProms = items.map(item => db.collection('plan_items').add(item));

  // ready to create new plan item in db
  Promise.all(createProms)
    .then(data => {
      if (!data
        || !data.length) {
        return Promise.reject(`plan not added for username: ${req.params.username}`);
      }
      return next();
    })
    .catch(err => {
      console.log(`${moment()}: ERROR: error adding plan for username: ${req.params.username}`, err);
      return res.status(400).send(err);
    });
};

planItemsController.updatePlanItem = (req, res, next) => {
  // validate request data and convert into properly formatted plan item
  if (!req.body.item) return res.status(400).send('no item in req.body');
  const updatedItem = createUpdateItem(req.body.item);
  if (!Object.keys(updatedItem)) return res.status(400).send('invalid item in req.body');

  // ready to create new plan item in db
  db.collection('plan_items')
    .doc(req.params.itemId)
    .update(updatedItem)
    .then(snapshot => {
      if (!snapshot) {
        return Promise.reject(`plan item not updated for username: ${req.params.username}`);
      }
      return next();
    })
    .catch(err => {
      console.log(`${moment()}: ERROR: error updating plan item for username: ${req.params.username}`, err);
      return res.status(400).send(err);
    });
};

planItemsController.addPlanItem = (req, res, next) => {
  // validate request data and convert into properly formatted plan item
  if (!req.body.item) return res.status(400).send('no item in req.body');
  const newItem = createAndValidatePlanItem(req.body.item);
  if (!newItem) return res.status(400).send('invalid item in req.body');

  // ready to create new plan item in db
  db.collection('plan_items')
    .add(newItem)
    .then(snapshot => {
      if (!snapshot) {
        return Promise.reject(`plan item not added for username: ${req.params.username}`);
      }
      return next();
    })
    .catch(err => {
      console.log(`${moment()}: ERROR: error adding plan item for username: ${req.params.username}`, err);
      return res.status(400).send(err);
    });
};

module.exports = planItemsController;