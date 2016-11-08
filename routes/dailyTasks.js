const router = require('express').Router();
const config = require('../db/connections.js');
const knex = require('knex')(config.development);

router.route('/')
      .get(getDailyTask)
      .post(addDailyTask);

router.route('/:id')
      .put(updateDailyTask)
      .delete(deleteDailyTask);

function getDailyTask(req, res) {
  var userID = req.user.id;

  knex.select().from('task_daily').where('item_creator', userID).orderBy('id').then(function (response) {
    res.send(response);
  }).catch(function (err) {
    console.log('Error Querying the DB', err);
    res.send(err);
  });
};

function addDailyTask(req, res) {
  var userID = req.user.id;
  var item1 = req.body.item1;
  var amount = req.body.amount;
  var item2 = req.body.item2;
  var complete = false;

  var dailyTask = { item_creator: userID,
                        complete: complete,
                        item1: item1,
                        amount: amount,
                        item2: item2,
                      };

  console.log('dailyTask', dailyTask);
  knex.insert(dailyTask).into('task_daily')
      .then(function (response) {
        console.log('response', response);
        res.sendStatus(200);
      }).catch(function (err) {
        console.log('Error Querying the DB', err);
        res.sendStatus(500);
      });
};

function updateDailyTask(req, res) {
  var userID = req.user.id;
  var id = req.params.id;
  var item1 = req.body.item1;
  var amount = req.body.amount;
  var item2 = req.body.item2;
  var complete = req.body.complete;

  var dailyTask = { item_creator: userID,
                        complete: complete,
                        item1: item1,
                        amount: amount,
                        item2: item2,
                      };

  knex('task_daily').where('id', id)
             .update(dailyTask)
             .then(function (response) {
              console.log('update response', response);
              res.sendStatus(200);
            }).catch(function (err) {
              console.log('Error Querying the DB', err);
              res.sendStatus(500);
            });
};

function deleteDailyTask(req, res) {
  var id = req.params.id;

  knex('task_daily').where('id', id)
                    .delete()
                    .then(function () {
                      res.sendStatus(204);
                    }).catch(function (err) {
                      console.log('Error Querying the DB', err);
                      res.sendStatus(500);
                    });
};

module.exports = router;
