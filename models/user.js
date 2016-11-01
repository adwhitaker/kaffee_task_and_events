const router = require('express').Router();
const config = require('../db/connections.js');
const knex = require('knex')(config.development);

function findById(googleID) {
  console.log('googleID:', googleID.googleid);
  return new Promise(function (resolve, reject) {
    knex.select()
    .from('task_users')
    .where('googleid', googleID.googleid)
    .then(function (data) {
      resolve(null);
      // @TODO: this is where I'm stuck it gets to here and fails
    }).catch(function (err) {
      console.log('Error Querying the DB', err);
      return reject(err);
    });
  });
};

function create(googleID) {
  return new Promise(function (resolve, reject) {

    knex.insert(googleID.googleid)
        .into('task_users')
        .returning()
        .then(function (response) {
          console.log('response', response);
          res.sendStatus(200);
        }).catch(function (err) {
          console.log('Error Querying the DB', err);
          return reject(err);
        });

      });
};

module.exports = {
  findById: findById,
  create: create,
};
