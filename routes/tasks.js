const router = require('express').Router();
const config = require('../db/connections.js');
const knex = require('knex')(config.development);

// CRUD tasks from DB
router.route('/')
      .get(getTasks)
      .post(postTask);

router.route('/:id')
      .put(updateTask)
      .delete(deleteTask);

// get tasks from the DB
function getTasks(req, res) {
  var userID = req.user.id;
  var today = req.query.currentDay;

  knex.select()
      .from('task_items')
      .where('item_creater', userID)
      .andWhere('start_date', '<=', today)
      .orderBy('id')
      .then(function (data) {
        res.send(data);
      }).catch(function (err) {
        console.log(err);
        res.sendStatus(500);
      });
};

// add task to the DB
function postTask(req, res) {
  var userID = req.user.id;
  var complete = false;
  var item = req.body.item;
  var startDate = req.body.start_date;
  var endDate = null;

  var insertRequest = { item: item,
                        complete: complete,
                        item_creater: userID,
                        start_date: startDate,
                        end_date: endDate, };

  knex('task_items').insert(insertRequest).then(function () {
    res.sendStatus(200);
  }).catch(function (err) {
    console.log(err);
  });
};

// update task in the DB
function updateTask(req, res) {
  var id = req.params.id;
  var userID = req.user.id;
  var complete = req.body.complete;
  var item = req.body.item;
  var startDate = req.body.start_date;
  var endDate = req.body.end_date;

  var insertRequest = { item: item,
                        complete: complete,
                        item_creater: userID,
                        start_date: startDate,
                        end_date: endDate, };

  knex('task_items').where('id', id)
               .update(insertRequest)
               .then(function (response) {
                res.sendStatus(200);
              });
};

// delete task from the DB
function deleteTask(req, res) {
  var id = req.params.id;

  knex('task_items').where('id', id)
               .delete()
               .then(function () {
                  res.sendStatus(204);
                }).catch(function (err) {
                  console.log(err);
                  res.sendStatus(500);
                });;
};

module.exports = router;
