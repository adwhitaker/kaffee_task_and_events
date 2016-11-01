const router = require('express').Router();
const config = require('../db/connections.js');
const knex = require('knex')(config.development);

// @TODO is it good to set a Promise?

function findById(googleID) {
  console.log('googleID:', googleID.googleid);
  return new Promise(function (resolve, reject) {
    knex.select()
    .from('task_users')
    .where('googleid', googleID.googleid)
    .then(function (data) {
      resolve(data[0]);
    }).catch(function (err) {
      console.log('Error Querying the DB', err);
      return reject(err);
    });
  });
};

function create(googleID) {
  console.log('inside create');
  return new Promise(function (resolve, reject) {

    knex.insert({googleid: googleID.googleid})
        .into('task_users')
        .then(function (response) {
          console.log('response', response);
          resolve(response);
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
