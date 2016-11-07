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
  knex.select().from('task_daily').then(function (response) {
    res.send(response);
  }).catch(function (err) {
    console.log('Error Querying the DB', err);
    res.send(err);
  });
};

function addDailyTask(req, res) {
  var item1 = req.body.item1;
  var amount = req.body.amount;
  var item2 = req.body.item2;

  knex.insert({ item1: item1, amount: amount, item2: item2 }).into('task_daily')
      .then(function (response) {
        console.log('response', response);
        res.sendStatus(200);
      }).catch(function (err) {
        console.log('Error Querying the DB', err);
        res.sendStatus(500);
      });
};

function updateDailyTask(req, res) {
  var id = req.params.id;
  var item1 = req.body.item1;
  var amount = req.body.amount;
  var item2 = req.body.item2;

  console.log('info', id, item1, amount, item2);

  knex('task_daily').where('id', id)
             .update({ item1: item1, amount: amount, item2: item2 })
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
