//@ts-check
"use strict"

module.exports = () => {
  const express = require('express');
  const router = express.Router();

  const utility = require('../lib/utils');
  const employeeLog = require('../controller/employeeLog');

  const userDetailsSchema = require('../validators/userDetails');

  router.get('/ping',
    utility.ping
  );

  router.post('/register',
    utility.authenicate,
    employeeLog.addUser
  );

  router.get('/list/punch',
    utility.authenicate,
    employeeLog.listPunchs
  );

  router.get('/list/in-out',
    utility.authenicate,
    employeeLog.listInout
  );

  router.all('*', (req, res) => {
    res.status(401).json({ error: 'Unauthorised access', code: 401 });
  });

  return router;
}
