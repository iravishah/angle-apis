const _ = require('lodash');

const m = require('../responses/responses.json');

const { reply } = require('../lib/utils');
const { insertEmployeeLog, list_punchs, list_inout } = require('../db/mongoUtils');

async function addUser(req, res, next) {
  const body = req.body;

  const [err, user] = await insertEmployeeLog(body);
  if (err) {
    return reply(res, m.m102);
  }
  res.status(201).json(user);
}

async function listPunchs(req, res, next) {
  if (!req.query || !req.query.emp_uid) {
    return reply(res, m.m102);
  }

  if (!req.query || !req.query.date) {
    return reply(res, m.m102);
  }
  const q = {
    emp_uid: req.query.emp_uid,
    created_at: { $gt: new Date(req.query.date).toISOString() }
  }
  const [err, users] = await list_punchs(q);
  if (err) {
    return reply(res, m.m102);
  }
  res.status(200).json({ users });
}

async function listInout(req, res, next) {
  if (!req.query || !req.query.emp_uid) {
    return reply(res, m.m102);
  }

  if (!req.query || !req.query.date) {
    return reply(res, m.m102);
  }
  const in_q = [{
    "$match": {
      emp_uid: req.query.emp_uid,
      created_at: { $gt: new Date(new Date(req.query.date).toISOString()) },
      action: "in"
    }
  }, {
    "$group": {
      "_id": "$emp_uid",
      "minTime": {
        "$min": "$created_at"
      }
    }
  }]


  const out_q = [{
    "$match": {
      emp_uid: req.query.emp_uid,
      created_at: { $gt: new Date(new Date(req.query.date).toISOString()) },
      action: "out"
    }
  }, {
    "$group": {
      "_id": "$emp_uid",
      "maxTime": {
        "$max": "$created_at"
      }
    }
  }]

  const [err, inTime] = await list_inout(in_q);
  const [e, outTime] = await list_inout(out_q);

  if (err || e) {
    return reply(res, m.m102);
  }

  res.status(200).json({ inTime: inTime[0].minTime, outTime: outTime[0].maxTime });
}

module.exports = {
  addUser,
  listPunchs,
  listInout
}