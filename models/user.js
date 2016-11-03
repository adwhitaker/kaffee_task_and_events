const router = require('express').Router();
const config = require('../db/connections.js');
const knex = require('knex')(config.development);

// @TODO is it good to set a Promise?

function findById(googleID, accessToken, refreshToken) {
  console.log('googleID:', googleID);
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

function create(googleID, accessToken, refreshToken) {
  console.log('inside create');
  return new Promise(function (resolve, reject) {

    knex.insert({googleid: googleID, accesstoken: accessToken, refreshtoken: refreshToken})
        .into('task_users')
        .returning('*')
        .then(function (response) {
          console.log('response', response);
          resolve(response[0]);
        }).catch(function (err) {
          console.log('Error Querying the DB', err);
          return reject(err);
        });

      });
};

function updateTokens(googleID, accessToken, refreshToken) {
  console.log('This is the googleID', googleID);
  console.log('This is a refresh token:', refreshToken);
  console.log('This is an access token:', accessToken);

  return new Promise(function (resolve, reject) {

    knex('task_users').where('googleid', googleID)
                      .update({ accesstoken: accessToken, refreshtoken: refreshToken })
                      .returning('*')
                      .then(function (response) {
                        console.log('update response', response);
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
  updateTokens: updateTokens,
};
