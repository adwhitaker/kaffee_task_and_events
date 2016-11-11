const router = require('express').Router();
const config = require('../db/connections.js');

router.get('/', function (req, res) {
  console.log('inside logout');
  req.logout();
  res.redirect('/');
});

module.exports = router;
