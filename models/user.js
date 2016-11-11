const router = require('express').Router();
const config = require('../db/connections.js');
const knex = require('knex')(config.development);

// find user in the DB by ID Number
function findById(googleID, accessToken, refreshToken) {
  return new Promise(function (resolve, reject) {

    knex.select()
    .from('task_users')
    .where('googleid', googleID)
    .then(function (data) {
      resolve(data[0]);
    }).catch(function (err) {
      console.log('Error Querying the DB', err);
      return reject(err);
    });
  });
};

// create new user in DB after user is not found by ID
function create(googleID, accessToken, refreshToken) {
  return new Promise(function (resolve, reject) {

        knex.insert({ googleid: googleID, accesstoken: accessToken, refreshtoken: refreshToken })
        .into('task_users')
        .returning('*')
        .then(function (response) {
          resolve(response[0]);
        }).catch(function (err) {
          console.log('Error Querying the DB', err);
          return reject(err);
        });

      });
};

// update access and refresh tokens in the DB
function updateTokens(googleID, accessToken, refreshToken) {
  return new Promise(function (resolve, reject) {

    knex('task_users').where('googleid', googleID)
                      .update({ accesstoken: accessToken, refreshtoken: refreshToken })
                      .returning('*')
                      .then(function (response) {
                        resolve(response);
                      }).catch(function (err) {
                        console.log('Error Querying the DB', err);
                        return reject(err);
                      });

  });
};

// export the three functions
module.exports = {
  findById: findById,
  create: create,
  updateTokens: updateTokens,
};
