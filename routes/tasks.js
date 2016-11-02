const router = require('express').Router();
const config = require('../db/connections.js');
const knex = require('knex')(config.development);

router.route('/')
      .get(getTasks)
      .post(postTask);

function getTasks(req, res) {
  knex.select()
      .from('task_items')
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
  var endDate = req.body.end_date;

  console.log('req.user', req.user, 'req.body', req.body);
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

module.exports = router;
