const router = require('express').Router();
const config = require('../db/connections.js');
const knex = require('knex')(config.development);

router.route('/')
      .get(getTasks)
      .post(postTask);

router.route('/:id')
      .put(updateTask)
      .delete(deleteTask);

function getTasks(req, res) {
  var userID = req.user.id;

  knex.select()
      .from('task_items')
      .where('item_creater', userID)
      .orderBy('id')
      .then(function (data) {
        res.send(data);
      }).catch(function (err) {
        console.log(err);
        res.sendStatus(500);
      });
};

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

  console.log(insertRequest);
  knex('task_items').insert(insertRequest).then(function () {
    res.sendStatus(200);
  }).catch(function (err) {
    console.log(err);
  });

}

function updateTask(req, res) {
  var id = req.params.id;
  var complete = req.body.complete;
  var item = req.body.item;
  var startDate = req.body.start_date;
  var endDate = req.body.end_date;

  console.log('req.user', req.user, 'req.body', req.body);
  var insertRequest = { item: item,
                        complete: complete,
                        start_date: startDate,
                        end_date: endDate, };

  knex('task_items').where('id', id)
               .update(insertRequest)
               .then(function (response) {
                console.log('update response', response);
                res.sendStatus(200);
              });
};

function deleteTask(req, res) {
  var id = req.params.id;

  knex('task_items').where('id', id)
               .delete()
               .then(function () {
                  console.log('deleted entry');
                  res.sendStatus(204);
                }).catch(function (err) {
                  console.log(err);
                  res.sendStatus(500);
                });;
};

module.exports = router;
