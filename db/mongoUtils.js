const mongoose = require('mongoose');

require('../models/employeeLog');

const EmployeeLog = mongoose.model('EmployeeLog');

const { wait } = require('../lib/utils');
/**
 *
 *
 * @param {*} data
 * @returns promise
 */
async function insertEmployeeLog(data) {
  return await wait(EmployeeLog.create, EmployeeLog, data);
}
/**
 *
 *
 * @param {*} query
 * @param {*} select
 * @param {*} opts
 * @returns promise
 */
async function list_punchs(query = {}, select = {}, opts = {}) {
  return await wait(EmployeeLog.find, EmployeeLog, query, select, opts);
}

async function list_inout(query = {}, select = {}, opts = {}) {
  return await wait(EmployeeLog.aggregate, EmployeeLog, query);
}

module.exports = {
  insertEmployeeLog,
  list_punchs,
  list_inout
}