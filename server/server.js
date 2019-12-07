const express = require('express');
const moment = require('moment');
const path = require('path');

const planItemsController = require('./controllers/planItemsController');

const app = express();
const PORT = 8080;
const listeningCB = () => {
  process.env.NODE_ENV
    ? console.log(`${moment()}: ${process.env.NODE_ENV} server listening on port ${PORT}`)
    : console.log(`${moment()}: default server listening on port ${PORT}`)
};

app.use(express.json());

app.get('/api/users/:username/plan',
  planItemsController.getPlan,
  (req, res) => {
    return res.status(200).json({ plan: res.locals.plan });
  },
);

app.post('/api/users/:username/plan',
  planItemsController.addPlan,
  planItemsController.getPlan,
  (req, res) => {
    return res.status(200).json({ plan: res.locals.plan });
  },
);

app.post('/api/users/:username/item',
  planItemsController.addPlanItem,
  planItemsController.getPlan,
  (req, res) => {
    return res.status(200).json({ plan: res.locals.plan });
  },
);

app.put('/api/users/:username/item/:itemId',
  planItemsController.updatePlanItem,
  planItemsController.getPlan,
  (req, res) => {
    return res.status(200).json({ plan: res.locals.plan });
  },
);

app.use((req, res) => res.sendStatus(200));

app.listen(PORT, listeningCB);